import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    rspH,
    rspW,
    rspF,
    act_hg,
    safe_top,
    safe_bottom,
} from '../../../theme/responsive';
import DoctorDetailHeader from './Components/DoctorDetailHeader';

const DoctorDetail = () => {
    const [aboutExpanded, setAboutExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <DoctorDetailHeader />
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Doctor Card */}
                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://i.imgur.com/RpMgvEf.png' }}
                        style={styles.doctorImg}
                    />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>Dr. David Patel</Text>
                        <Text style={styles.specialization}>Cardiologist</Text>
                        <View style={styles.hospitalRow}>
                            <Ionicons name="location-sharp" size={rspF(13)} color="#888" />
                            <Text style={styles.hospital}>Golden Cardiology Center</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <MaterialIcons name="groups" size={rspF(20)} color="#1C274C" />
                        <Text style={styles.statLabel}>2,000+</Text>
                        <Text style={styles.statSub}>patients</Text>
                    </View>
                    <View style={styles.statBox}>
                        <FontAwesome name="briefcase" size={rspF(20)} color="#1C274C" />
                        <Text style={styles.statLabel}>10+</Text>
                        <Text style={styles.statSub}>experience</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialIcons name="star-rate" size={rspF(20)} color="#F5A623" />
                        <Text style={styles.statLabel}>5</Text>
                        <Text style={styles.statSub}>rating</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialIcons name="rate-review" size={rspF(20)} color="#1C274C" />
                        <Text style={styles.statLabel}>1,872</Text>
                        <Text style={styles.statSub}>reviews</Text>
                    </View>
                </View>

                {/* About Me */}
                <Text style={styles.sectionTitle}>About me</Text>
                <Text style={styles.sectionText}>
                    {aboutExpanded
                        ? 'Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA, known for his patient-first approach and empathetic care. His research in heart rhythm disorders has been widely acclaimed in medical journals and he continues to mentor budding specialists.'
                        : 'Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA... '}
                    <Text
                        onPress={() => setAboutExpanded(prev => !prev)}
                        style={{ color: '#007BFF', fontWeight: '500' }}>
                        {aboutExpanded ? ' view less' : ' view more'}
                    </Text>
                </Text>

                {/* Working Time */}
                <Text style={styles.sectionTitle}>Working Time</Text>
                <Text style={styles.sectionText}>Monday–Friday, 08.00 AM–18.00 PM</Text>

                {/* Reviews */}
                <View style={styles.reviewHeader}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    <Text style={{ color: '#007BFF' }}>See All</Text>
                </View>

                {[1, 2, 3].map((_, index) => (
                    <View key={index} style={styles.reviewBox}>
                        <Image
                            source={{ uri: `https://randomuser.me/api/portraits/women/${44 + index}.jpg` }}
                            style={styles.reviewAvatar}
                        />
                        <View style={{ flex: 1 }}>
                            <View style={styles.reviewTitle}>
                                <Text style={styles.reviewName}>Emily Anderson</Text>
                                <View style={styles.reviewStars}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FontAwesome
                                            key={i}
                                            name="star"
                                            size={rspF(12)}
                                            color="#F5A623"
                                            style={{ marginRight: 2 }}
                                        />
                                    ))}
                                </View>
                            </View>
                            <Text style={styles.sectionText}>
                                Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone in need of cardiac care.
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Spacer for Button */}
                <View style={{ height: rspH(80) }} />
            </ScrollView>

            {/* Book Appointment Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DoctorDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: safe_top || rspH(16),
        paddingHorizontal: rspW(16),
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: rspW(16),
        padding: rspW(12),
        marginVertical: rspH(16),
        alignItems: 'center',
    },
    doctorImg: {
        width: rspW(70),
        height: rspW(70),
        borderRadius: rspW(35),
        marginRight: rspW(12),
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: rspF(20),
        fontWeight: 'bold',
    },
    specialization: {
        fontSize: rspF(14),
        color: '#555',
        marginTop: rspH(4),
    },
    hospitalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: rspH(2),
    },
    hospital: {
        fontSize: rspF(13),
        color: '#888',
        marginLeft: rspW(4),
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: rspH(12),
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
    },
    statLabel: {
        fontWeight: 'bold',
        fontSize: rspF(14),
        marginTop: rspH(4),
    },
    statSub: {
        fontSize: rspF(12),
        color: '#777',
        marginTop: rspH(2),
    },
    sectionTitle: {
        fontSize: rspF(18),
        fontWeight: 'bold',
        marginTop: rspH(16),
    },
    sectionText: {
        fontSize: rspF(14),
        color: '#444',
        marginTop: rspH(6),
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: rspH(16),
    },
    reviewBox: {
        flexDirection: 'row',
        marginTop: rspH(12),
        backgroundColor: '#f2f2f2',
        padding: rspW(12),
        borderRadius: rspW(12),
    },
    reviewAvatar: {
        width: rspW(40),
        height: rspW(40),
        borderRadius: rspW(20),
        marginRight: rspW(10),
    },
    reviewTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewName: {
        fontWeight: 'bold',
        fontSize: rspF(14),
    },
    reviewStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: safe_bottom || rspH(20),
        left: rspW(16),
        right: rspW(16),
        backgroundColor: '#1C274C',
        paddingVertical: rspH(14),
        borderRadius: rspW(16),
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: rspF(16),
        fontWeight: '600',
    },
});
