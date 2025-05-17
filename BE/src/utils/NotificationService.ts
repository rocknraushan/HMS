import admin from 'firebase-admin';
import User, { INotification } from '../models/User';

/**
 * Sends a push notification to a user and stores it in the user's notification list.
 * 
 * @param userId - MongoDB ID of the user to notify
 * @param fcmToken - User's FCM device token
 * @param notification - The notification object to send and store
 */
export async function sendNotificationAndStore(
  userId: string,
  fcmToken: string,
  notification: {
    title: string;
    body: string;
    data?: Record<string, string>;
    type?: 'appointment' | 'emergency' | 'system' | 'reminder';
    icon?: string;
  }
): Promise<void> {
  try {
    console.log("sending notification to ", userId,fcmToken)
    // 1. Send push notification using FCM
    const message = {
      token: fcmToken,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: notification.data || {},
    };

    await admin.messaging().send(message);

    // 2. Save the notification into the user's document
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const newNotification: INotification = {
      ...notification,
      read: false,
      createdAt: new Date(),
    };

    user.notification = [newNotification, ...(user.notification || [])];
    await user.save();
  } catch (error) {
    console.error('Error sending and saving notification:', error);
    throw error;
  }
}
