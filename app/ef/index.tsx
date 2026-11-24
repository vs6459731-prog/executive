import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EfButton, EfCard, EfCoachingCard, EfProgressGate, EfScreen } from '@/components/ef/EfScreen';
import { GameMeter } from '@/components/GameMeter';
import { colors, gameCard, type } from '@/constants/theme';
import { useEfProgress } from '@/context/EfProgressContext';
import { efLessons } from '@/data/efLessons';

export default function EfHome() {
  const router = useRouter();
  const { progress } = useEfProgress();

  return (
    <EfScreen title="Executive Functioning">
      <EfCard>
        <Text style={type.body}>Executive functioning is how you plan, focus, remember what to do, and get started. These seven lessons help you practice those skills with real schoolwork, from tonight’s homework to a big test.</Text>
      </EfCard>
      <EfProgressGate>
        {progress && (
          <>
            <EfCard title="Your progress">
              <Text style={type.bodyStrong}>{progress.completed} of {efLessons.length} lessons complete</Text>
              <GameMeter progress={progress.completed / efLessons.length} color={colors.primary} />
            </EfCard>
            {efLessons.map((lesson, index) => {
              const complete = index < progress.completed;
              const locked = index > progress.completed;
              const status = complete ? 'Completed' : locked ? 'Locked' : progress.startedNext ? 'In progress' : 'Ready to start';
              return (
                <Pressable key={lesson.id} accessibilityRole="link" accessibilityState={{ disabled: locked }}
                  disabled={locked} onPress={() => router.push({ pathname: '/ef/[lesson]', params: { lesson: lesson.id } })}
                  style={({ pressed }) => [styles.lesson, locked && styles.locked, pressed && styles.pressed]}>
                  <Ionicons name={complete ? 'checkmark-circle' : locked ? 'lock-closed-outline' : 'play-circle-outline'}
                    size={23} color={complete ? colors.mint : locked ? colors.muted : colors.primary} />
                  <View style={styles.lessonText}>
                    <Text style={type.bodyStrong}>{index + 1}. {lesson.title}</Text>
                    <Text style={type.caption}>{status} · {lesson.minutes}</Text>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}
      </EfProgressGate>
      <EfButton label="My wins" onPress={() => router.push('/ef/wins')} />
      <EfButton label="For parents and caregivers" onPress={() => router.push('/ef/parents')} />
      <EfCoachingCard />
    </EfScreen>
  );
}

const styles = StyleSheet.create({
  lesson: { ...gameCard, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  lessonText: { flex: 1, gap: 3 },
  locked: { backgroundColor: colors.surfaceSunken },
  pressed: { opacity: 0.8 },
});
