import { Stack } from 'expo-router';

import { EfProgressProvider } from '@/context/EfProgressContext';

export default function EfLayout() {
  return (
    <EfProgressProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </EfProgressProvider>
  );
}
