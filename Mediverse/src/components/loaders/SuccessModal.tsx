import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Animated,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { SuccessIcon } from '../../assets/icons/svg/SvgIcons';
const { width } = Dimensions.get('window');

type SuccessModalProps = {
    visible: boolean;
    onClose: () => void;
    duration?: number;
    title:string;
    subTitle:string;
};

const SuccessModal: React.FC<SuccessModalProps> = React.memo(({ visible, onClose, duration = 3000, subTitle,title }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
                    <View style={styles.iconWrapper}>

                        <SuccessIcon />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>
                        {subTitle}</Text>
                    <ActivityIndicator size="small" color="#333" style={{ marginTop: 15 }} />
                </Animated.View>
            </View>
        </Modal>
    );
});

export default SuccessModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    iconWrapper: {
        marginBottom: 20,
    },
    iconCircle: {
        backgroundColor: '#5EC5AE',
        padding: 15,
        borderRadius: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#111',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    },
});
