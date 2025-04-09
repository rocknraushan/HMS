import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = 220;

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutBottomSheet = ({ visible, onClose, onConfirm }: Props) => {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const isVisible = useSharedValue(visible);

  useEffect(() => {
    if (visible) {
      isVisible.value = true;
      translateY.value = withSpring(0, { damping: 20 });
    } else {
      translateY.value = withTiming(SHEET_HEIGHT, {}, () => {
        runOnJS(onClose)(); // Triggers Modal close after animation
      });
    }
  }, [visible]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        translateY.value = withTiming(SHEET_HEIGHT, {}, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 20 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: interpolate(translateY.value, [0, SHEET_HEIGHT], [1, 0.3]),
  }));

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.backdrop}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sheetContainer, animatedSheetStyle]}>
            <Text style={styles.title}>Logout</Text>
            <Text style={styles.message}>Are you sure you want to log out?</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onConfirm}>
                <Text style={[styles.buttonText, styles.logoutText]}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};

export default LogoutBottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  logoutButton: {
    backgroundColor: '#0F172A',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  cancelText: {
    color: '#4B5563',
  },
  logoutText: {
    color: '#fff',
  },
});
