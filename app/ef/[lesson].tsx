import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { EfChoice, EfExercise } from '@/components/ef/EfExercise';
import { EfButton, EfCard, EfCoachingCard, EfProgressGate, EfScreen } from '@/components/ef/EfScreen';
import { type } from '@/constants/theme';
import { useEfProgress } from '@/context/EfProgressContext';
import { efLessons } from '@/data/efLessons';

export function generateStaticParams() {
  return efLessons.map(lesson => ({ lesson: lesson.id }));
}

export default function EfLessonRoute() {
  const { lesson } = useLocalSearchParams<{ lesson: string }>();
  const { progress } = useEfProgress();
  const index = efLessons.findIndex(item => item.id === lesson);

  return (
    <EfScreen title={index < 0 ? 'Executive Functioning' : `Lesson ${index + 1} of ${efLessons.length}`} inner>
      <EfProgressGate>
        {index < 0 ? (
          <EfCard title="Lesson unavailable">
            <Text style={type.body}>Go back to Executive Functioning to choose a lesson.</Text>
          </EfCard>
        ) : progress && index > progress.completed ? (
          <EfCard title={efLessons[index].title}>
            <Text style={type.body}>Finish the previous lesson to unlock this one.</Text>
          </EfCard>
        ) : (
          <LessonContent key={index} index={index} />
        )}
      </EfProgressGate>
    </EfScreen>
  );
}

function LessonContent({ index }: { index: number }) {
  const router = useRouter();
  const { progress, saving, saveError, saveLesson } = useEfProgress();
  const [exerciseDone, setExerciseDone] = useState(false);
  const [choices, setChoices] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const lesson = efLessons[index];
  const nextLesson = efLessons[index + 1];
  const complete = index < (progress?.completed ?? 0);
  const allCorrect = checked && lesson.quiz.every((question, number) => choices[number] === question.correct);

  useEffect(() => {
    void saveLesson(index, false);
  }, [index, saveLesson]);

  const finish = async () => {
    if (await saveLesson(index, true)) setJustCompleted(true);
  };

  return (
    <>
      <EfCard title={lesson.title}>
        <Text style={type.caption}>{lesson.minutes}</Text>
        {lesson.explanation.map(paragraph => <Text key={paragraph} style={type.body}>{paragraph}</Text>)}
      </EfCard>
      <EfCard title="At school">
        <Text style={type.body}>{lesson.example}</Text>
      </EfCard>
      <EfExercise lesson={lesson.id} done={exerciseDone} onDone={() => setExerciseDone(true)} />
      <EfCard title="Quick quiz">
        {lesson.quiz.map((question, number) => {
          const correct = choices[number] === question.correct;
          return (
            <View key={question.prompt} style={{ gap: 6, marginBottom: 8 }}
              accessibilityRole="radiogroup" accessibilityLabel={question.prompt}>
              <Text style={type.bodyStrong}>{number + 1}. {question.prompt}</Text>
              {question.choices.map((choice, choiceIndex) => (
                <EfChoice key={choice} label={choice} selected={choices[number] === choiceIndex}
                  onPress={() => {
                    setChoices(previous => ({ ...previous, [number]: choiceIndex }));
                    setChecked(false);
                  }} />
              ))}
              {checked && (
                <Text accessibilityLiveRegion="polite" style={type.body}>
                  {correct ? `Correct. ${question.feedback}` : 'Try this question again.'}
                </Text>
              )}
            </View>
          );
        })}
        <EfButton label="Check quiz answers" disabled={checked || Object.keys(choices).length !== lesson.quiz.length}
          onPress={() => setChecked(true)} />
      </EfCard>
      <EfCard title="Try this week">
        <Text style={type.body}>{lesson.action}</Text>
      </EfCard>
      {!complete && (
        <>
          <Text style={type.caption}>Finish the exercise and answer all three questions correctly to complete the lesson.</Text>
          {saveError && <Text accessibilityRole="alert" style={type.body}>We couldn’t save your progress. Try again.</Text>}
          <EfButton primary label={saving && exerciseDone && allCorrect ? 'Saving…' : 'Complete lesson'}
            disabled={saving || !exerciseDone || !allCorrect} onPress={() => { void finish(); }} />
        </>
      )}
      {complete && (
        <EfCard title={justCompleted && !nextLesson ? 'You finished all seven lessons!' : 'Lesson complete'}>
          {nextLesson ? (
            <EfButton primary label="Next lesson" onPress={() => router.replace({
              pathname: '/ef/[lesson]', params: { lesson: nextLesson.id },
            })} />
          ) : (
            <EfButton primary label="See My wins" onPress={() => router.push('/ef/wins')} />
          )}
        </EfCard>
      )}
      {complete && !nextLesson && <EfCoachingCard />}
    </>
  );
}
