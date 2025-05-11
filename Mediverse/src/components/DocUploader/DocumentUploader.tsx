// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Pressable,
//   Modal,
//   FlatList,
//   Alert,
//   Platform,
//   Image,
//   ActivityIndicator,
//   StyleSheet,
//   PermissionsAndroid,
// } from 'react-native';
// import DocumentPicker, { 
//   DocumentPickerResponse, 
//   types as DocumentTypes 
// } from 'react-native-document-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import VectorIcons, { IconSets } from '../Icons/VectorIcons';
// import Pdf from 'react-native-pdf';
// import { rspH, rspW, rspF } from '../../theme/responsive';
// import RNFetchBlob from 'react-native-blob-util';

// interface DocumentItem extends DocumentPickerResponse {
//   isUrl?: boolean;
// }

// interface Props {
//   value: DocumentItem[];
//   onChange: (docs: DocumentItem[]) => void;
//   maxFileSize?: number; // in bytes, default will be 10MB
//   maxFiles?: number; // optional limit to number of files
//   acceptedTypes?: string[]; // optional filter for accepted file types
// }

// const DocumentUploader = ({ 
//   value = [], 
//   onChange, 
//   maxFileSize = 10 * 1024 * 1024, // 10MB default
//   maxFiles,
//   acceptedTypes
// }: Props) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [previewItem, setPreviewItem] = useState<DocumentItem | null>(null);
//   const [resolvedUri, setResolvedUri] = useState<string | null>(null);
//   const [isLoadingPreview, setIsLoadingPreview] = useState(false);
//   const [hasPermission, setHasPermission] = useState(false);
  
//   // Request permissions on Android
//   useEffect(() => {
//     const checkAndRequestPermissions = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const storagePermission = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             {
//               title: 'Storage Permission',
//               message: 'App needs access to your storage to select documents.',
//               buttonPositive: 'Allow',
//               buttonNegative: 'Deny',
//             }
//           );
          
//           setHasPermission(storagePermission === PermissionsAndroid.RESULTS.GRANTED);
          
//           if (storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
//             Alert.alert(
//               'Permission Denied',
//               'You need to grant storage permission to upload documents.',
//               [{ text: 'OK' }]
//             );
//           }
//         } catch (error) {
//           console.error('Error requesting permissions:', error);
//         }
//       } else {
//         // iOS doesn't need explicit permissions for document picker
//         setHasPermission(true);
//       }
//     };
    
//     checkAndRequestPermissions();
//   }, []);

//   // Resolve document URIs safely
//   const resolveDocumentUri = useCallback(async (document: DocumentItem): Promise<string | null> => {
//     if (!document) return null;
    
//     try {
//       // For URL-based documents, use the URI directly
//       if (document.isUrl) {
//         return document.uri;
//       }
      
//       // For Android content URIs, resolve to file path
//       if (Platform.OS === 'android' && document.uri.startsWith('content://')) {
//         try {
//           // Try using RNFetchBlob to get the actual file path
//           const stat = await RNFetchBlob.fs.stat(document.uri);
//           if (stat?.path) {
//             return `file://${stat.path}`;
//           }
          
//           // Fall back to using the original URI if stat doesn't work
//           return document.uri;
//         } catch (error) {
//           console.warn('Error resolving content URI:', error);
//           // Just return the original URI if we can't resolve it
//           return document.uri;
//         }
//       } 
      
//       // For iOS file URIs, make sure they have the file:// prefix
//       if (Platform.OS === 'ios' && !document.uri.startsWith('file://')) {
//         return `file://${document.uri}`;
//       }
      
//       // For all other cases, return the URI as-is
//       return document.uri;
//     } catch (error) {
//       console.error('Failed to resolve document URI:', error);
//       return null;
//     }
//   }, []);

//   // Effect to handle preview item changes
//   useEffect(() => {
//     const loadPreview = async () => {
//       if (!previewItem) {
//         setResolvedUri(null);
//         return;
//       }

//       setIsLoadingPreview(true);
      
//       try {
//         const uri = await resolveDocumentUri(previewItem);
//         setResolvedUri(uri);
//       } catch (error) {
//         console.error('Failed to load preview:', error);
//         Alert.alert('Error', 'Unable to preview this document');
//       } finally {
//         setIsLoadingPreview(false);
//       }
//     };

//     loadPreview();
//   }, [previewItem, resolveDocumentUri]);

//   // Helper function to validate file size
//   const validateFileSize = (file: DocumentPickerResponse): boolean => {
//     if (!maxFileSize) return true;
//     if (!file.size) return true; // If size is unknown, allow it
    
//     if (file.size > maxFileSize) {
//       const sizeMB = Math.round(maxFileSize / (1024 * 1024));
//       Alert.alert('File too large', `Files must be smaller than ${sizeMB}MB.`);
//       return false;
//     }
//     return true;
//   };

//   // Pick documents from device storage
//   const handlePickDocuments = async () => {
//     if (!hasPermission && Platform.OS === 'android') {
//       Alert.alert('Permission Required', 'Storage permission is needed to pick documents.');
//       return;
//     }
    
//     try {
//       // Check if we've hit the maximum number of files
//       if (maxFiles && value.length >= maxFiles) {
//         Alert.alert('Maximum Files Reached', `You can upload a maximum of ${maxFiles} files.`);
//         return;
//       }
      
//       // Determine how many more files can be selected
//       const remainingFiles = maxFiles ? maxFiles - value.length : undefined;
      
//       // Determine what file types to accept
//       const fileTypes = acceptedTypes || [
//         DocumentTypes.pdf, 
//         DocumentTypes.images,
//         DocumentTypes.plainText,
//         DocumentTypes.doc,
//         DocumentTypes.docx,
//         DocumentTypes.xls,
//         DocumentTypes.xlsx,
//         DocumentTypes.ppt,
//         DocumentTypes.pptx
//       ];
      
//       const result = await DocumentPicker.pick({
//         type: fileTypes,
//         allowMultiSelection: true,
//       });
//       const validFiles = result.filter(validateFileSize).slice(0, remainingFiles);
      
//       if (validFiles.length > 0) {
//         onChange([...value, ...validFiles]);
//       }
//     } catch (err: any) {
//       if (DocumentPicker.isCancel(err)) return;
//       console.error('Document picker error:', err);
//       Alert.alert('Error', 'Failed to pick documents. Please try again.');
//     }
//   };

//   // Pick and crop an image
//   const handlePickImage = async () => {
//     if (!hasPermission && Platform.OS === 'android') {
//       Alert.alert('Permission Required', 'Storage permission is needed to pick images.');
//       return;
//     }
    
//     // Check if we've hit the maximum number of files
//     if (maxFiles && value.length >= maxFiles) {
//       Alert.alert('Maximum Files Reached', `You can upload a maximum of ${maxFiles} files.`);
//       return;
//     }
    
//     try {
//       const image = await ImageCropPicker.openPicker({
//         mediaType: 'photo',
//         cropping: true,
//         cropperToolbarTitle: 'Crop Image',
//         compressImageQuality: 0.8, // Compress to reduce file size
//       });
      
//       const formattedImage = {
//         uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
//         type: image.mime,
//         name: image.filename || `image-${Date.now()}.jpg`,
//         size: image.size,
//         fileCopyUri: null, // Required by DocumentItem type
//       };
      
//       // Validate file size
//       if (validateFileSize(formattedImage)) {
//         onChange([...value, formattedImage]);
//       }
//     } catch (err: any) {
//       if (err.code !== 'E_PICKER_CANCELLED') {
//         console.error("Image selection error:", err);
//         Alert.alert('Error', 'Failed to pick image. Please try again.');
//       }
//     }
//   };

//   // Remove a document from the list
//   const handleRemoveDocument = (index: number) => {
//     const newDocs = value.filter((_, i) => i !== index);
//     onChange(newDocs);
//   };

//   // Preview a document
//   const handlePreviewDocument = (item: DocumentItem) => {
//     setPreviewItem(item);
//   };

//   // Close the preview modal
//   const closePreview = () => {
//     setPreviewItem(null);
//     setResolvedUri(null);
//   };

//   // Check if the item is a PDF
//   const isPdf = (item: DocumentItem) => {
//     return item.type?.toLowerCase().includes('pdf') || 
//            item.name?.toLowerCase().endsWith('.pdf') || 
//            item.uri?.toLowerCase().endsWith('.pdf');
//   };

//   // Check if the item is an image
//   const isImage = (item: DocumentItem) => {
//     return item.type?.toLowerCase().includes('image') || 
//            ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].some(ext => 
//              item.name?.toLowerCase().endsWith(ext) || item.uri?.toLowerCase().endsWith(ext)
//            );
//   };

//   // Get file icon and color based on file type
//   const getFileIconInfo = (item: DocumentItem) => {
//     if (isPdf(item)) {
//       return { icon: 'file-pdf-box', color: '#EF4444' };
//     } else if (isImage(item)) {
//       return { icon: 'file-image', color: '#10B981' };
//     } else if (item.name?.toLowerCase().endsWith('.doc') || item.name?.toLowerCase().endsWith('.docx')) {
//       return { icon: 'file-word', color: '#3B82F6' };
//     } else if (item.name?.toLowerCase().endsWith('.xls') || item.name?.toLowerCase().endsWith('.xlsx')) {
//       return { icon: 'file-excel', color: '#10B981' };
//     } else if (item.name?.toLowerCase().endsWith('.ppt') || item.name?.toLowerCase().endsWith('.pptx')) {
//       return { icon: 'file-powerpoint', color: '#F97316' };
//     } else if (item.name?.toLowerCase().endsWith('.txt')) {
//       return { icon: 'file-document-outline', color: '#6B7280' };
//     } else {
//       return { icon: 'file-document', color: '#3B82F6' };
//     }
//   };

//   // Render a document item in the list
//   const renderDocument = (item: DocumentItem, index: number) => {
//     const { icon, color } = getFileIconInfo(item);
//     const documentIsImage = isImage(item);

//     return (
//       <View style={styles.documentItem}>
//         <Pressable
//           onPress={() => handlePreviewDocument(item)}
//           style={styles.documentPreviewBtn}>
//           {documentIsImage ? (
//             <Image
//               source={{ uri: item.uri }}
//               style={styles.thumbnailImage}
//               // defaultSource={require('../../assets/placeholder.png')} 
//             />
//           ) : (
//             <VectorIcons
//               name={icon}
//               size={rspW(40)}
//               color={color}
//               iconSet={IconSets.MaterialCommunityIcons}
//               style={styles.documentIcon}
//             />
//           )}
//           <View style={styles.documentInfo}>
//             <Text numberOfLines={1} style={styles.documentName}>
//               {item.name || `Document ${index + 1}`}
//             </Text>
//             {item.size && (
//               <Text style={styles.documentSize}>
//                 {(item.size / (1024 * 1024)).toFixed(2)} MB
//               </Text>
//             )}
//           </View>
//         </Pressable>

//         <Pressable 
//           onPress={() => handleRemoveDocument(index)} 
//           style={styles.removeBtn}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         >
//           <VectorIcons
//             name="trash-can"
//             size={rspW(22)}
//             color="#EF4444"
//             iconSet={IconSets.MaterialCommunityIcons}
//           />
//         </Pressable>
//       </View>
//     );
//   };

//   // Render the preview content based on file type
//   const renderPreviewContent = () => {
//     if (isLoadingPreview) {
//       return (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#4F46E5" />
//           <Text style={styles.loadingText}>Loading preview...</Text>
//         </View>
//       );
//     }

//     if (!resolvedUri || !previewItem) return null;

//     if (isPdf(previewItem)) {
//       return (
//         <Pdf
//           source={{ uri: resolvedUri }}
//           onLoadComplete={(numberOfPages) => {
//             console.log(`PDF loaded with ${numberOfPages} pages`);
//           }}
//           onError={(error) => {
//             console.log('Error loading PDF:', error);
//             Alert.alert('Error', 'Unable to load this PDF document');
//             closePreview();
//           }}
//           style={styles.pdfView}
//           enablePaging={true}
//           enableRTL={false}
//           trustAllCerts={false}
//           renderActivityIndicator={() => (
//             <ActivityIndicator size="large" color="#4F46E5" />
//           )}
//         />
//       );
//     } else if (isImage(previewItem)) {
//       return (
//         <Image
//           source={{ uri: resolvedUri }}
//           style={styles.imagePreview}
//           resizeMode="contain"
//           onError={() => {
//             Alert.alert('Error', 'Unable to load this image');
//             closePreview();
//           }}
//         />
//       );
//     } else {
//       return (
//         <View style={styles.unsupportedContainer}>
//           <VectorIcons
//             name="file-document"
//             size={rspW(60)}
//             color="#9CA3AF"
//             iconSet={IconSets.MaterialCommunityIcons}
//           />
//           <Text style={styles.unsupportedText}>
//             Preview not available for this file type
//           </Text>
//           <Text style={styles.documentDetailsText}>
//             {previewItem.name || "Unknown file"}
//             {previewItem.size && ` (${(previewItem.size / (1024 * 1024)).toFixed(2)} MB)`}
//           </Text>
//         </View>
//       );
//     }
//   };

//   // Display a message about upload limits if applicable
//   const renderLimitsInfo = () => {
//     if (!maxFiles && !maxFileSize) return null;
    
//     const fileCountText = maxFiles ? `${value.length}/${maxFiles} files` : null;
//     const fileSizeText = maxFileSize ? `Max ${maxFileSize / (1024 * 1024)}MB per file` : null;
    
//     const infoText = [fileCountText, fileSizeText].filter(Boolean).join(' • ');
    
//     return (
//       <Text style={styles.limitsInfo}>{infoText}</Text>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.btnContainer}>
//         <Pressable 
//           onPress={handlePickDocuments} 
//           style={[styles.uploadBtn, !hasPermission && Platform.OS === 'android' && styles.disabledBtn]}
//           disabled={!hasPermission && Platform.OS === 'android'}
//         >
//           <VectorIcons
//             name="upload"
//             size={rspW(20)}
//             color="#fff"
//             iconSet={IconSets.MaterialCommunityIcons}
//             style={styles.btnIcon}
//           />
//           <Text style={styles.btnText}>Upload Documents</Text>
//         </Pressable>

//         <Pressable 
//           onPress={handlePickImage} 
//           style={[styles.imageBtn, !hasPermission && Platform.OS === 'android' && styles.disabledBtn]}
//           disabled={!hasPermission && Platform.OS === 'android'}
//         >
//           <VectorIcons
//             name="image"
//             size={rspW(20)}
//             color="#fff"
//             iconSet={IconSets.MaterialCommunityIcons}
//             style={styles.btnIcon}
//           />
//           <Text style={styles.btnText}>Upload Image</Text>
//         </Pressable>
//       </View>

//       {renderLimitsInfo()}

//       {value.length > 0 && (
//         <Pressable onPress={() => setModalVisible(true)} style={styles.viewDocsBtn}>
//           <Text style={styles.viewDocsText}>View Uploaded Documents ({value.length})</Text>
//         </Pressable>
//       )}

//       {/* List Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Uploaded Documents</Text>
//               <Pressable 
//                 onPress={() => setModalVisible(false)}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <VectorIcons
//                   name="close"
//                   size={rspW(24)}
//                   color="#333"
//                   iconSet={IconSets.MaterialIcons}
//                 />
//               </Pressable>
//             </View>

//             {value.length > 0 ? (
//               <FlatList
//                 data={value}
//                 keyExtractor={(_, index) => index.toString()}
//                 contentContainerStyle={styles.listContainer}
//                 renderItem={({ item, index }) => renderDocument(item, index)}
//               />
//             ) : (
//               <View style={styles.emptyContainer}>
//                 <VectorIcons
//                   name="file-upload-outline"
//                   size={rspW(48)}
//                   color="#9CA3AF"
//                   iconSet={IconSets.MaterialCommunityIcons}
//                 />
//                 <Text style={styles.emptyText}>No documents uploaded yet</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Preview Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={!!previewItem}
//         onRequestClose={closePreview}>
//         <View style={styles.previewOverlay}>
//           <View style={styles.previewContent}>
//             {renderPreviewContent()}
            
//             <Pressable 
//               onPress={closePreview} 
//               style={styles.closePreviewBtn}
//               hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//             >
//               <VectorIcons
//                 name="close"
//                 size={24}
//                 color="#333"
//                 iconSet={IconSets.MaterialIcons}
//               />
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: rspH(10),
//   },
//   btnContainer: {
//     flexDirection: 'column',
//     gap: rspH(14),
//   },
//   uploadBtn: {
//     marginTop: rspH(24),
//     backgroundColor: '#4F46E5',
//     paddingVertical: rspH(14),
//     paddingHorizontal: rspW(24),
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageBtn: {
//     backgroundColor: '#10B981',
//     paddingVertical: rspH(14),
//     paddingHorizontal: rspW(24),
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   disabledBtn: {
//     opacity: 0.5,
//   },
//   btnIcon: {
//     marginRight: rspW(8),
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: rspF(16),
//     fontWeight: '600',
//   },
//   viewDocsBtn: {
//     marginTop: rspH(14),
//     alignSelf: 'center',
//     backgroundColor: '#E0E7FF',
//     paddingVertical: rspH(8),
//     paddingHorizontal: rspW(16),
//     borderRadius: 10,
//   },
//   viewDocsText: {
//     color: '#4F46E5',
//     fontWeight: '600',
//   },
//   limitsInfo: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: rspF(12),
//     marginTop: rspH(8),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: rspH(20),
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     maxHeight: '70%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: rspH(10),
//   },
//   modalTitle: {
//     fontSize: rspF(18),
//     fontWeight: 'bold',
//     color: '#1F2937',
//   },
//   listContainer: {
//     paddingTop: rspH(10),
//   },
//   documentItem: {
//     padding: rspH(10),
//     backgroundColor: '#F3F4F6',
//     borderRadius: 10,
//     marginBottom: rspH(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   documentPreviewBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   documentInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   documentIcon: {
//     marginRight: rspW(12),
//   },
//   thumbnailImage: {
//     width: rspW(40),
//     height: rspW(40),
//     borderRadius: 6,
//     marginRight: rspW(12),
//     backgroundColor: '#E5E7EB',
//   },
//   documentName: {
//     fontSize: rspF(14),
//     color: '#1F2937',
//     fontWeight: '600',
//     flexShrink: 1,
//   },
//   documentSize: {
//     fontSize: rspF(12),
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   removeBtn: {
//     padding: rspW(5),
//   },
//   previewOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.85)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewContent: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pdfView: {
//     flex: 1,
//     width: '90%',
//     height: '90%',
//     backgroundColor: '#FFF',
//   },
//   imagePreview: {
//     width: '90%',
//     height: '80%',
//     backgroundColor: 'transparent',
//   },
//   closePreviewBtn: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     zIndex: 1000,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#FFFFFF',
//     marginTop: rspH(10),
//     fontSize: rspF(16),
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: rspH(30),
//   },
//   emptyText: {
//     marginTop: rspH(10),
//     color: '#6B7280',
//     fontSize: rspF(16),
//   },
//   unsupportedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: rspH(20),
//   },
//   unsupportedText: {
//     color: '#FFFFFF',
//     marginTop: rspH(10),
//     fontSize: rspF(16),
//     textAlign: 'center',
//   },
//   documentDetailsText: {
//     color: '#E5E7EB',
//     marginTop: rspH(5),
//     fontSize: rspF(12),
//     textAlign: 'center',
//   },
// });

// export default DocumentUploader;







import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  Alert,
  Platform,
  Image,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import DocumentPicker, { 
  DocumentPickerResponse, 
  types as DocumentTypes 
} from 'react-native-document-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import VectorIcons, { IconSets } from '../Icons/VectorIcons';
import Pdf from 'react-native-pdf';
import { rspH, rspW, rspF } from '../../theme/responsive';
import RNFetchBlob from 'react-native-blob-util';

interface DocumentItem extends DocumentPickerResponse {
  isUrl?: boolean;
}

interface Props {
  value: DocumentItem[];
  onChange: (docs: DocumentItem[]) => void;
  maxFileSize?: number; // in bytes, default will be 10MB
  maxFiles?: number; // optional limit to number of files
  acceptedTypes?: string[]; // optional filter for accepted file types
  hasPermission?: boolean; // external permission control
}

const DocumentUploader = ({ 
  value = [], 
  onChange, 
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxFiles,
  acceptedTypes,
  hasPermission: externalPermission
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [previewItem, setPreviewItem] = useState<DocumentItem | null>(null);
  const [resolvedUri, setResolvedUri] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [internalPermission, setInternalPermission] = useState(false);
  
  // Determine if we have permission from either internal or external source
  const hasPermission = externalPermission !== undefined ? externalPermission : internalPermission;
  
  // Set iOS permissions as granted by default
  useEffect(() => {
    // On iOS, document picker doesn't need explicit permissions
    if (Platform.OS === 'ios') {
      setInternalPermission(true);
    }
  }, []);

  // Resolve document URIs safely
  const resolveDocumentUri = useCallback(async (document: DocumentItem): Promise<string | null> => {
    if (!document) return null;
    
    try {
      // For URL-based documents, use the URI directly
      if (document.isUrl) {
        return document.uri;
      }
      
      // For Android content URIs, resolve to file path
      if (Platform.OS === 'android' && document.uri.startsWith('content://')) {
        try {
          // Try using RNFetchBlob to get the actual file path
          const stat = await RNFetchBlob.fs.stat(document.uri);
          if (stat?.path) {
            return `file://${stat.path}`;
          }
          
          // Fall back to using the original URI if stat doesn't work
          return document.uri;
        } catch (error) {
          console.warn('Error resolving content URI:', error);
          // Just return the original URI if we can't resolve it
          return document.uri;
        }
      } 
      
      // For iOS file URIs, make sure they have the file:// prefix
      if (Platform.OS === 'ios' && !document.uri.startsWith('file://')) {
        return `file://${document.uri}`;
      }
      
      // For all other cases, return the URI as-is
      return document.uri;
    } catch (error) {
      console.error('Failed to resolve document URI:', error);
      return null;
    }
  }, []);

  // Effect to handle preview item changes
  useEffect(() => {
    const loadPreview = async () => {
      if (!previewItem) {
        setResolvedUri(null);
        return;
      }

      setIsLoadingPreview(true);
      
      try {
        const uri = await resolveDocumentUri(previewItem);
        setResolvedUri(uri);
      } catch (error) {
        console.error('Failed to load preview:', error);
        Alert.alert('Error', 'Unable to preview this document');
      } finally {
        setIsLoadingPreview(false);
      }
    };

    loadPreview();
  }, [previewItem, resolveDocumentUri]);

  // Helper function to validate file size
  const validateFileSize = (file: DocumentPickerResponse): boolean => {
    if (!maxFileSize) return true;
    if (!file.size) return true; // If size is unknown, allow it
    
    if (file.size > maxFileSize) {
      const sizeMB = Math.round(maxFileSize / (1024 * 1024));
      Alert.alert('File too large', `Files must be smaller than ${sizeMB}MB.`);
      return false;
    }
    return true;
  };

  // Pick documents from device storage
  const handlePickDocuments = async () => {
    if (!hasPermission && Platform.OS === 'android') {
      // Check if we can request permission internally
      if (externalPermission === undefined) {
        try {
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to select documents.',
              buttonPositive: 'Allow',
              buttonNegative: 'Deny',
            }
          );
          
          setInternalPermission(storagePermission === PermissionsAndroid.RESULTS.GRANTED);
          
          if (storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
            return; // Don't proceed if permission was denied
          }
        } catch (error) {
          console.error('Error requesting permissions:', error);
          return;
        }
      } else {
        return; // If external permission handling is in use but permission not granted
      }
    }
    
    try {
      // Check if we've hit the maximum number of files
      if (maxFiles && value.length >= maxFiles) {
        Alert.alert('Maximum Files Reached', `You can upload a maximum of ${maxFiles} files.`);
        return;
      }
      
      // Determine how many more files can be selected
      const remainingFiles = maxFiles ? maxFiles - value.length : undefined;
      
      // Determine what file types to accept
      const fileTypes = acceptedTypes || [
        DocumentTypes.pdf, 
        DocumentTypes.images,
        DocumentTypes.plainText,
        DocumentTypes.doc,
        DocumentTypes.docx,
        DocumentTypes.xls,
        DocumentTypes.xlsx,
        DocumentTypes.ppt,
        DocumentTypes.pptx
      ];
      
      const result = await DocumentPicker.pick({
        type: fileTypes,
        allowMultiSelection: true,
        // If there's a limit on remaining files, ensure we don't exceed it
        // limit: remainingFiles,
      });
      
      // Filter out files that are too large
      const validFiles = result.filter(validateFileSize);
      
      if (validFiles.length > 0) {
        onChange([...value, ...validFiles]);
      }
    } catch (err: any) {
      if (DocumentPicker.isCancel(err)) return;
      console.error('Document picker error:', err);
      Alert.alert('Error', 'Failed to pick documents. Please try again.');
    }
  };

  // Pick and crop an image
  const handlePickImage = async () => {
    if (!hasPermission && Platform.OS === 'android') {
      // Check if we can request permission internally
      if (externalPermission === undefined) {
        try {
          const storagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to select images.',
              buttonPositive: 'Allow',
              buttonNegative: 'Deny',
            }
          );
          
          setInternalPermission(storagePermission === PermissionsAndroid.RESULTS.GRANTED);
          
          if (storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
            return; // Don't proceed if permission was denied
          }
        } catch (error) {
          console.error('Error requesting permissions:', error);
          return;
        }
      } else {
        return; // If external permission handling is in use but permission not granted
      }
    }
    
    // Check if we've hit the maximum number of files
    if (maxFiles && value.length >= maxFiles) {
      Alert.alert('Maximum Files Reached', `You can upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        cropperToolbarTitle: 'Crop Image',
        compressImageQuality: 0.8, // Compress to reduce file size
      });
      
      const formattedImage = {
        uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
        type: image.mime,
        name: image.filename || `image-${Date.now()}.jpg`,
        size: image.size,
        fileCopyUri: null, // Required by DocumentItem type
      };
      
      // Validate file size
      if (validateFileSize(formattedImage)) {
        onChange([...value, formattedImage]);
      }
    } catch (err: any) {
      if (err.code !== 'E_PICKER_CANCELLED') {
        console.error("Image selection error:", err);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
      }
    }
  };

  // Remove a document from the list
  const handleRemoveDocument = (index: number) => {
    const newDocs = value.filter((_, i) => i !== index);
    onChange(newDocs);
  };

  // Preview a document
  const handlePreviewDocument = (item: DocumentItem) => {
    setPreviewItem(item);
  };

  // Close the preview modal
  const closePreview = () => {
    setPreviewItem(null);
    setResolvedUri(null);
  };

  // Check if the item is a PDF
  const isPdf = (item: DocumentItem) => {
    return item.type?.toLowerCase().includes('pdf') || 
           item.name?.toLowerCase().endsWith('.pdf') || 
           item.uri?.toLowerCase().endsWith('.pdf');
  };

  // Check if the item is an image
  const isImage = (item: DocumentItem) => {
    return item.type?.toLowerCase().includes('image') || 
           ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].some(ext => 
             item.name?.toLowerCase().endsWith(ext) || item.uri?.toLowerCase().endsWith(ext)
           );
  };

  // Get file icon and color based on file type
  const getFileIconInfo = (item: DocumentItem) => {
    if (isPdf(item)) {
      return { icon: 'file-pdf-box', color: '#EF4444' };
    } else if (isImage(item)) {
      return { icon: 'file-image', color: '#10B981' };
    } else if (item.name?.toLowerCase().endsWith('.doc') || item.name?.toLowerCase().endsWith('.docx')) {
      return { icon: 'file-word', color: '#3B82F6' };
    } else if (item.name?.toLowerCase().endsWith('.xls') || item.name?.toLowerCase().endsWith('.xlsx')) {
      return { icon: 'file-excel', color: '#10B981' };
    } else if (item.name?.toLowerCase().endsWith('.ppt') || item.name?.toLowerCase().endsWith('.pptx')) {
      return { icon: 'file-powerpoint', color: '#F97316' };
    } else if (item.name?.toLowerCase().endsWith('.txt')) {
      return { icon: 'file-document-outline', color: '#6B7280' };
    } else {
      return { icon: 'file-document', color: '#3B82F6' };
    }
  };

  // Render a document item in the list
  const renderDocument = (item: DocumentItem, index: number) => {
    const { icon, color } = getFileIconInfo(item);
    const documentIsImage = isImage(item);

    return (
      <View style={styles.documentItem}>
        <Pressable
          onPress={() => handlePreviewDocument(item)}
          style={styles.documentPreviewBtn}>
          {documentIsImage ? (
            <Image
              source={{ uri: item.uri }}
              style={styles.thumbnailImage}
              // defaultSource={require('../../assets/placeholder.png')} 
            />
          ) : (
            <VectorIcons
              name={icon}
              size={rspW(40)}
              color={color}
              iconSet={IconSets.MaterialCommunityIcons}
              style={styles.documentIcon}
            />
          )}
          <View style={styles.documentInfo}>
            <Text numberOfLines={1} style={styles.documentName}>
              {item.name || `Document ${index + 1}`}
            </Text>
            {item.size && (
              <Text style={styles.documentSize}>
                {(item.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            )}
          </View>
        </Pressable>

        <Pressable 
          onPress={() => handleRemoveDocument(index)} 
          style={styles.removeBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <VectorIcons
            name="trash-can"
            size={rspW(22)}
            color="#EF4444"
            iconSet={IconSets.MaterialCommunityIcons}
          />
        </Pressable>
      </View>
    );
  };

  // Render the preview content based on file type
  const renderPreviewContent = () => {
    if (isLoadingPreview) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading preview...</Text>
        </View>
      );
    }

    if (!resolvedUri || !previewItem) return null;

    if (isPdf(previewItem)) {
      return (
        <Pdf
          source={{ uri: resolvedUri }}
          onLoadComplete={(numberOfPages) => {
            console.log(`PDF loaded with ${numberOfPages} pages`);
          }}
          onError={(error) => {
            console.log('Error loading PDF:', error);
            Alert.alert('Error', 'Unable to load this PDF document');
            closePreview();
          }}
          style={styles.pdfView}
          enablePaging={true}
          enableRTL={false}
          trustAllCerts={false}
          renderActivityIndicator={() => (
            <ActivityIndicator size="large" color="#4F46E5" />
          )}
        />
      );
    } else if (isImage(previewItem)) {
      return (
        <Image
          source={{ uri: resolvedUri }}
          style={styles.imagePreview}
          resizeMode="contain"
          onError={() => {
            Alert.alert('Error', 'Unable to load this image');
            closePreview();
          }}
        />
      );
    } else {
      return (
        <View style={styles.unsupportedContainer}>
          <VectorIcons
            name="file-document"
            size={rspW(60)}
            color="#9CA3AF"
            iconSet={IconSets.MaterialCommunityIcons}
          />
          <Text style={styles.unsupportedText}>
            Preview not available for this file type
          </Text>
          <Text style={styles.documentDetailsText}>
            {previewItem.name || "Unknown file"}
            {previewItem.size && ` (${(previewItem.size / (1024 * 1024)).toFixed(2)} MB)`}
          </Text>
        </View>
      );
    }
  };

  // Display a message about upload limits if applicable
  const renderLimitsInfo = () => {
    if (!maxFiles && !maxFileSize) return null;
    
    const fileCountText = maxFiles ? `${value.length}/${maxFiles} files` : null;
    const fileSizeText = maxFileSize ? `Max ${maxFileSize / (1024 * 1024)}MB per file` : null;
    
    const infoText = [fileCountText, fileSizeText].filter(Boolean).join(' • ');
    
    return (
      <Text style={styles.limitsInfo}>{infoText}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Pressable 
          onPress={handlePickDocuments} 
          style={[styles.uploadBtn, !hasPermission && Platform.OS === 'android' && styles.disabledBtn]}
          disabled={!hasPermission && Platform.OS === 'android'}
        >
          <VectorIcons
            name="upload"
            size={rspW(20)}
            color="#fff"
            iconSet={IconSets.MaterialCommunityIcons}
            style={styles.btnIcon}
          />
          <Text style={styles.btnText}>Upload Documents</Text>
        </Pressable>

        <Pressable 
          onPress={handlePickImage} 
          style={[styles.imageBtn, !hasPermission && Platform.OS === 'android' && styles.disabledBtn]}
          disabled={!hasPermission && Platform.OS === 'android'}
        >
          <VectorIcons
            name="image"
            size={rspW(20)}
            color="#fff"
            iconSet={IconSets.MaterialCommunityIcons}
            style={styles.btnIcon}
          />
          <Text style={styles.btnText}>Upload Image</Text>
        </Pressable>
      </View>

      {renderLimitsInfo()}

      {value.length > 0 && (
        <Pressable onPress={() => setModalVisible(true)} style={styles.viewDocsBtn}>
          <Text style={styles.viewDocsText}>View Uploaded Documents ({value.length})</Text>
        </Pressable>
      )}

      {/* List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Uploaded Documents</Text>
              <Pressable 
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <VectorIcons
                  name="close"
                  size={rspW(24)}
                  color="#333"
                  iconSet={IconSets.MaterialIcons}
                />
              </Pressable>
            </View>

            {value.length > 0 ? (
              <FlatList
                data={value}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item, index }) => renderDocument(item, index)}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <VectorIcons
                  name="file-upload-outline"
                  size={rspW(48)}
                  color="#9CA3AF"
                  iconSet={IconSets.MaterialCommunityIcons}
                />
                <Text style={styles.emptyText}>No documents uploaded yet</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Preview Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!previewItem}
        onRequestClose={closePreview}>
        <View style={styles.previewOverlay}>
          <View style={styles.previewContent}>
            {/* {renderPreviewContent()} */}
            
            <Pressable 
              onPress={closePreview} 
              style={styles.closePreviewBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <VectorIcons
                name="close"
                size={24}
                color="#333"
                iconSet={IconSets.MaterialIcons}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: rspH(10),
  },
  btnContainer: {
    flexDirection: 'column',
    gap: rspH(14),
  },
  uploadBtn: {
    marginTop: rspH(24),
    backgroundColor: '#4F46E5',
    paddingVertical: rspH(14),
    paddingHorizontal: rspW(24),
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBtn: {
    backgroundColor: '#10B981',
    paddingVertical: rspH(14),
    paddingHorizontal: rspW(24),
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  btnIcon: {
    marginRight: rspW(8),
  },
  btnText: {
    color: '#fff',
    fontSize: rspF(16),
    fontWeight: '600',
  },
  viewDocsBtn: {
    marginTop: rspH(14),
    alignSelf: 'center',
    backgroundColor: '#E0E7FF',
    paddingVertical: rspH(8),
    paddingHorizontal: rspW(16),
    borderRadius: 10,
  },
  viewDocsText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  limitsInfo: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: rspF(12),
    marginTop: rspH(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: rspH(20),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rspH(10),
  },
  modalTitle: {
    fontSize: rspF(18),
    fontWeight: 'bold',
    color: '#1F2937',
  },
  listContainer: {
    paddingTop: rspH(10),
  },
  documentItem: {
    padding: rspH(10),
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: rspH(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  documentPreviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  documentIcon: {
    marginRight: rspW(12),
  },
  thumbnailImage: {
    width: rspW(40),
    height: rspW(40),
    borderRadius: 6,
    marginRight: rspW(12),
    backgroundColor: '#E5E7EB',
  },
  documentName: {
    fontSize: rspF(14),
    color: '#1F2937',
    fontWeight: '600',
    flexShrink: 1,
  },
  documentSize: {
    fontSize: rspF(12),
    color: '#6B7280',
    marginTop: 2,
  },
  removeBtn: {
    padding: rspW(5),
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfView: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#FFF',
  },
  imagePreview: {
    width: '90%',
    height: '80%',
    backgroundColor: 'transparent',
  },
  closePreviewBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 1000,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: rspH(10),
    fontSize: rspF(16),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rspH(30),
  },
  emptyText: {
    marginTop: rspH(10),
    color: '#6B7280',
    fontSize: rspF(16),
  },
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: rspH(20),
  },
  unsupportedText: {
    color: '#FFFFFF',
    marginTop: rspH(10),
    fontSize: rspF(16),
    textAlign: 'center',
  },
  documentDetailsText: {
    color: '#E5E7EB',
    marginTop: rspH(5),
    fontSize: rspF(12),
    textAlign: 'center',
  },
});

export default DocumentUploader;