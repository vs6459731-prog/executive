import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, gameCardInner, layout, type } from '@/constants/theme';
import { formatClock } from '@/lib/time';
import { EfButton, EfCard } from './EfScreen';

type ExerciseProps = { done: boolean; onDone: () => void };

const selfCheck = [
  'How often do you know which step to do first?',
  'How often can you get back on track after a distraction?',
  'How often do you remember directions while you work?',
];
const resetSteps = [
  'Clear one spot on your desk or empty one backpack pocket.',
  'Sort papers into turn in, keep, and recycle.',
  'Put your most-used supplies where you can reach them.',
  'Set out one thing you need for tomorrow.',
];

const assignmentFields = ['Assignment', 'First step', 'Second step', 'Third step'];
const startFields = ['Task I’ve put off', 'My two-minute first move'];
const startHours = [7, 9, 12, 15, 16, 17, 18, 19, 20];

function blockTime(index: number) {
  const hour = Math.floor(index / 2);
  return `${hour % 12 || 12}:${index % 2 ? '30' : '00'} ${hour < 12 ? 'AM' : 'PM'}`;
}

const memoryGroups = [
  { label: 'Lab safety', words: ['Goggles', 'Gloves', 'Apron'] },
  { label: 'Math kit', words: ['Ruler', 'Calculator', 'Pencil'] },
];
const memoryChoices = ['Ruler', 'Gloves', 'Notebook', 'Goggles', 'Tape', 'Calculator', 'Apron', 'Pencil', 'Folder'];
const memoryAnswers = memoryGroups.flatMap(group => group.words);

export function EfChoice({
  label, selected, onPress, checkbox = false,
}: { label: string; selected: boolean; onPress: () => void; checkbox?: boolean }) {
  return (
    <Pressable accessibilityRole={checkbox ? 'checkbox' : 'radio'} accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      onPress={onPress} style={[styles.choice, selected && styles.selected]}>
      <Text style={type.bodyStrong}>{selected ? '✓ ' : ''}{label}</Text>
    </Pressable>
  );
}

function SelfCheck({ done, onDone }: ExerciseProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  return (
    <EfCard title="Try it · Check in with yourself">
      <Text style={type.body}>Think about a typical school day. Pick the answer that feels right for you.</Text>
      {selfCheck.map((question, index) => (
        <View key={question} style={styles.group} accessibilityRole="radiogroup" accessibilityLabel={question}>
          <Text style={type.bodyStrong}>{question}</Text>
          {['Rarely', 'Sometimes', 'Often'].map(answer => (
            <EfChoice key={answer} label={answer} selected={answers[index] === answer}
              onPress={() => setAnswers(previous => ({ ...previous, [index]: answer }))} />
          ))}
        </View>
      ))}
      <EfButton label={done ? 'Self-check complete' : 'Finish my self-check'}
        disabled={done || Object.keys(answers).length < selfCheck.length} onPress={onDone} />
      {done && <Text style={type.body}>Pick one answer you’d like to move closer to “Often.” Look for a strategy to try in the next lessons.</Text>}
    </EfCard>
  );
}

function ExerciseFields({
  labels, values, setValue,
}: { labels: readonly string[]; values: Record<string, string>; setValue: (label: string, text: string) => void }) {
  return labels.map(label => (
    <View key={label} style={styles.group}>
      <Text style={type.bodyStrong}>{label}</Text>
      <TextInput accessibilityLabel={label} value={values[label] ?? ''}
        autoComplete="off" maxLength={140} onChangeText={text => setValue(label, text)} style={styles.input} />
    </View>
  ));
}

function WrittenExercise({ variant, done, onDone }: ExerciseProps & { variant: 'plan' | 'time' | 'finish' }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [start, setStart] = useState<number>();
  const labels = variant === 'time'
    ? Array.from({ length: 3 }, (_, offset) => {
      const block = (start ?? 0) + offset;
      return `${blockTime(block)} – ${blockTime(block + 1)}`;
    })
    : variant === 'plan' ? assignmentFields : startFields;
  const isReady = (variant !== 'time' || start !== undefined) && labels.every(label => values[label]?.trim());
  const titles = { plan: 'Break it down', time: 'Plan tomorrow', finish: 'Take the first step' };
  const prompts = {
    plan: 'Pick a real assignment. Write three small steps in order. Start each step with a verb like open, find, or write.',
    time: 'Pick an open time tomorrow. Give each of the next three 30-minute blocks a task, a break, or extra time.',
    finish: 'Choose one task you’ve been putting off. Write a first move that takes two minutes or less, then go do it now.',
  };
  const buttonLabels = { plan: 'Finish my assignment plan', time: 'Finish my schedule', finish: 'I took my first step' };

  return (
    <EfCard title={`Try it · ${titles[variant]}`}>
      <Text style={type.body}>{prompts[variant]}</Text>
      {variant === 'time' && (
        <View accessibilityRole="radiogroup" accessibilityLabel="Start time" style={styles.chips}>
          {startHours.map(hour => (
            <EfChoice key={hour} label={blockTime(hour * 2)} selected={start === hour * 2}
              onPress={() => {
                if (start === hour * 2) return;
                setValues({});
                setStart(hour * 2);
              }} />
          ))}
        </View>
      )}
      {(variant !== 'time' || start !== undefined) && (
        <ExerciseFields labels={labels} values={values}
          setValue={(label, text) => setValues(previous => ({ ...previous, [label]: text }))} />
      )}
      <EfButton label={done ? 'Exercise complete' : buttonLabels[variant]} disabled={done || !isReady} onPress={onDone} />
    </EfCard>
  );
}

function ResetChecklist({ done, onDone }: ExerciseProps) {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <EfCard title="Try it · Five-minute reset">
      <Text style={type.body}>Choose your desk or backpack. Give yourself five minutes and check each step as you go.</Text>
      {resetSteps.map(step => (
        <EfChoice key={step} label={step} checkbox selected={checked.includes(step)} onPress={() => {
          setChecked(previous => previous.includes(step) ? previous.filter(item => item !== step) : [...previous, step]);
        }} />
      ))}
      <EfButton label={done ? 'Reset complete' : 'Finish my reset'}
        disabled={done || checked.length < resetSteps.length} onPress={onDone} />
    </EfCard>
  );
}

const sprintSeconds = 10 * 60;

function FocusSprint({ done, onDone }: ExerciseProps) {
  const router = useRouter();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(sprintSeconds);

  useEffect(() => {
    if (deadline === null || done) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) clearInterval(interval);
    };
    const interval = setInterval(tick, 250);
    tick();
    return () => clearInterval(interval);
  }, [deadline, done]);

  return (
    <EfCard title="Try it · 10-minute focus sprint">
      <Text style={type.body}>Choose one school task. Open what you need, set distractions aside, and see what you can do in ten minutes.</Text>
      <Text accessibilityLabel={`${remaining} seconds remaining`} style={[type.title, styles.clock]}>{formatClock(remaining)}</Text>
      {done ? (
        <Text accessibilityLiveRegion="polite" style={type.bodyStrong}>Sprint complete. What helped you focus?</Text>
      ) : deadline === null ? (
        <EfButton label="Start 10-minute sprint" onPress={() => setDeadline(Date.now() + sprintSeconds * 1000)} />
      ) : remaining > 0 ? (
        <EfButton label="Reset sprint" onPress={() => { setDeadline(null); setRemaining(sprintSeconds); }} />
      ) : (
        <>
          <Text accessibilityLiveRegion="polite" style={type.bodyStrong}>Time’s up.</Text>
          <EfButton label="Finish my sprint" onPress={onDone} />
        </>
      )}
      <EfButton label="Open Mochi’s Focus screen" onPress={() => router.push('/(tabs)/focus')} />
    </EfCard>
  );
}

function MemoryGame({ done, onDone }: ExerciseProps) {
  const [recall, setRecall] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const matched = selected.filter(word => memoryAnswers.includes(word)).length;

  return (
    <EfCard title="Try it · Chunking memory game">
      {recall ? (
        <>
          <Text style={type.body}>Think back to the two groups. Which six items were on the list?</Text>
          <View style={styles.chips}>
            {memoryChoices.map(word => (
              <EfChoice key={word} label={word} checkbox selected={selected.includes(word)} onPress={() => {
                if (done) return;
                setFeedback('');
                setSelected(previous => previous.includes(word) ? previous.filter(item => item !== word) : [...previous, word]);
              }} />
            ))}
          </View>
          {!!feedback && <Text accessibilityLiveRegion="polite" style={type.bodyStrong}>{feedback}</Text>}
          <EfButton label={done ? 'Memory game complete' : 'Check my recall'}
            disabled={done || selected.length !== memoryAnswers.length}
            onPress={() => {
              setFeedback(`You recalled ${matched} of ${memoryAnswers.length} items.`);
              if (matched === memoryAnswers.length) onDone();
            }} />
          {!done && <EfButton label="Study the groups again" onPress={() => {
            setRecall(false);
            setSelected([]);
            setFeedback('');
          }} />}
        </>
      ) : (
        <>
          <Text style={type.body}>Study these two groups. Say the group names and picture what belongs in each one. Then hide the list and see what you remember.</Text>
          {memoryGroups.map(group => (
            <View key={group.label} style={styles.group}>
              <Text style={type.bodyStrong}>{group.label}</Text>
              <Text style={type.body}>{group.words.join(' · ')}</Text>
            </View>
          ))}
          <EfButton label="Hide list and start recall" onPress={() => setRecall(true)} />
        </>
      )}
    </EfCard>
  );
}

export function EfExercise({ lesson, ...props }: ExerciseProps & { lesson: string }) {
  switch (lesson) {
    case 'control-center': return <SelfCheck {...props} />;
    case 'plan':
    case 'time':
    case 'finish': return <WrittenExercise variant={lesson} {...props} />;
    case 'organize': return <ResetChecklist {...props} />;
    case 'focus': return <FocusSprint {...props} />;
    case 'memory': return <MemoryGame {...props} />;
    default: return null;
  }
}

const styles = StyleSheet.create({
  choice: {
    ...gameCardInner, minHeight: layout.touch, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 9,
  },
  selected: { backgroundColor: colors.primaryPale, borderColor: colors.primary },
  group: { gap: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: layout.radiusSmall,
    backgroundColor: colors.surfaceSunken,
    ...type.bodyStrong,
    minHeight: layout.touch,
    padding: 10,
  },
  clock: { fontVariant: ['tabular-nums'] },
});
