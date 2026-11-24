import { Text } from 'react-native';

import { EfCard, EfScreen } from '@/components/ef/EfScreen';
import { type } from '@/constants/theme';

export default function EfParents() {
  return (
    <EfScreen title="For parents" inner>
      <EfCard title="What your student is practicing">
        <Text style={type.body}>Across seven self-paced lessons, your student practices breaking down assignments, estimating time, organizing school materials, focusing, remembering directions, and starting and finishing work. Each lesson includes a real school example, a hands-on exercise, three review questions, and one action to try during the week.</Text>
        <Text style={type.body}>Your student can complete the module independently. They can use My wins to revisit the strategies they’ve practiced and choose one for an upcoming assignment, test, or project.</Text>
      </EfCard>
      <EfCard title="Start a conversation">
        <Text style={type.body}>Ask, “What’s one school task you want to make easier this week?” Let them choose a strategy, then check in after they try it. Ask which part helped and which part they’d change next time.</Text>
      </EfCard>
    </EfScreen>
  );
}
