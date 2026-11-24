import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { colors, gameCard, layout, type } from '@/constants/theme';
import { useEfProgress } from '@/context/EfProgressContext';

export function EfScreen({ title, children, inner = false }: { title: string; children: ReactNode; inner?: boolean }) {
  const router = useRouter();
  const goToModule = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/ef');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ScreenHeader title={title} onBack={inner ? goToModule : undefined} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function EfCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <View style={styles.card}>
      {!!title && <Text accessibilityRole="header" style={type.heading}>{title}</Text>}
      {children}
    </View>
  );
}

export function EfButton({
  label, onPress, primary = false, disabled = false,
}: {
  label: string;
  onPress: () => void;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled}
      onPress={onPress} style={({ pressed }) => [
        styles.button, primary && styles.primary, disabled && styles.disabled, pressed && styles.pressed,
      ]}>
      <Text style={[type.bodyStrong, primary && type.button]}>{label}</Text>
    </Pressable>
  );
}

export function EfProgressGate({ children }: { children: ReactNode }) {
  const { progress, loadError, load } = useEfProgress();
  if (loadError) {
    return (
      <EfCard>
        <Text accessibilityRole="alert" style={type.body}>We couldn’t load your progress.</Text>
        <EfButton label="Try again" onPress={() => { void load(); }} />
      </EfCard>
    );
  }
  return progress ? children : <Text accessibilityLiveRegion="polite" style={type.body}>Loading progress…</Text>;
}

export function EfCoachingCard() {
  const router = useRouter();
  return (
    <EfCard title="Want a coach with this?">
      <Text style={type.body}>$99 adds 1 live session + free consult.</Text>
      <Text style={type.body}>$299 adds 2 live sessions + consult + 2-week check-in.</Text>
      <EfButton label="Go to Consult" onPress={() => router.push('/consult')} />
    </EfCard>
  );
}

export function EfHomeEntry() {
  const router = useRouter();
  return (
    <Pressable accessibilityRole="link" onPress={() => router.push('/ef')}
      style={({ pressed }) => [styles.card, styles.entry, pressed && styles.pressed]}>
      <Ionicons name="school-outline" size={23} color={colors.primary} />
      <View style={styles.rowText}>
        <Text style={type.heading}>Executive Functioning</Text>
        <Text style={type.body}>Build skills for school at your own pace.</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.appCanvas },
  content: {
    width: '100%', maxWidth: layout.pageMaxWidth, alignSelf: 'center', gap: 16,
    padding: layout.horizontal, paddingBottom: 148,
  },
  card: { ...gameCard, padding: 16, gap: 10 },
  entry: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primaryPale },
  rowText: { flex: 1 },
  button: {
    minHeight: layout.touch, justifyContent: 'center', alignItems: 'center', padding: 12,
    backgroundColor: colors.primaryPale, borderRadius: layout.radiusSmall,
  },
  primary: { backgroundColor: colors.primary },
  disabled: { opacity: 0.6 },
  pressed: { opacity: 0.8 },
});
