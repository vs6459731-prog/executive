import { Text } from 'react-native';

import { EfCard, EfProgressGate, EfScreen } from '@/components/ef/EfScreen';
import { GameMeter } from '@/components/GameMeter';
import { colors, type } from '@/constants/theme';
import { useEfProgress } from '@/context/EfProgressContext';
import { efLessons } from '@/data/efLessons';

export default function EfWins() {
  const { progress } = useEfProgress();
  const completed = progress?.completed ?? 0;

  return (
    <EfScreen title="My wins" inner>
      <EfProgressGate>
        <EfCard>
          <Text style={type.bodyStrong}>{completed} of {efLessons.length} lessons complete</Text>
          <GameMeter progress={completed / efLessons.length} color={colors.mint} />
          {completed === 0 && <Text style={type.body}>Finish your first lesson to see the skill you practiced here.</Text>}
        </EfCard>
        {efLessons.slice(0, completed).map(lesson => (
          <EfCard key={lesson.id} title={lesson.skill}>
            <Text style={type.body}>✓ {lesson.title}</Text>
            <Text style={type.bodyStrong}>Try this week</Text>
            <Text style={type.body}>{lesson.action}</Text>
          </EfCard>
        ))}
      </EfProgressGate>
    </EfScreen>
  );
}
