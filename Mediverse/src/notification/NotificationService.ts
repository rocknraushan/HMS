import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

class NotificationService {
    async onDisplayNotification(title: string, body: string) {
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });

        // Display a notification
        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId,
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
            },
        });
    }

    async onCreateTriggerNotification(title: string, body: string, trigger: any) {
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                title: title,
                body: body,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                },
            },
            trigger,
        );
    }

    async onCancelAllNotifications() {
        await notifee.cancelAllNotifications();
    }

    async onNotificationEvent(event: any) {
        const { type, detail } = event;

        switch (type) {
            case EventType.DISMISSED:
                console.log('User dismissed notification', detail.notification);
                break;
            case EventType.PRESS:
                console.log('User pressed notification', detail.notification);
                break;
        }
    }
}

export default new NotificationService();