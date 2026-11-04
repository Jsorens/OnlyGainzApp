// components/RequireAuth.tsx
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/features/contexts/AuthProvider";

type Props = { children: React.ReactNode };

export function RequireAuth({ children }: Props) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
