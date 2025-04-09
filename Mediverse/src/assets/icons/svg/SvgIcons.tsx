import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const EditProfileIcon = (props:any) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 12.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m19.21 16.24-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M18.7 16.75c.3 1.08 1.14 1.92 2.22 2.22"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.41 22.5c0-3.87 3.85-7 8.59-7 1.04 0 2.04.15 2.97.43"
      />
    </Svg>
  )

  export const LogoutIcon = (props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.9 8.06c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12.5H3.62M5.85 9.15 2.5 12.5l3.35 3.35"
      />
    </Svg>
  )
  export const TermsIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M17 18.93h-4l-4.45 2.96A.997.997 0 0 1 7 21.06v-2.13c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 11.86v-.21c0-.68.42-1.04.84-1.33.41-.28.82-.64.82-1.3 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66M11.995 14.25h.01"
      />
    </Svg>
  );

  export const HelpIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20.91 11.62c0 4.89-3.55 9.47-8.4 10.81-.33.09-.69.09-1.02 0-4.85-1.34-8.4-5.92-8.4-10.81V7.23c0-.82.62-1.75 1.39-2.06l5.57-2.28c1.25-.51 2.66-.51 3.91 0l5.57 2.28c.76.31 1.39 1.24 1.39 2.06l-.01 4.39Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 13v3"
      />
    </Svg>
  );

  export const SettingsIcon =(props:any={}) =>  (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9Z"
      />
    </Svg>
  );
  export const BellIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M12.02 3.41c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 16.27c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V9.41c0-3.3-2.7-6-6-6Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M13.87 3.7a6.754 6.754 0 0 0-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26Z"
      />
      <Path
        stroke="#1C2A3A"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M15.02 19.56c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 0 1-.88-2.12"
      />
    </Svg>
  );

  export const HeartIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <Path
        stroke="#1C2A3A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12.62 21.31c-.34.12-.9.12-1.24 0C8.48 20.32 2 16.19 2 9.19 2 6.1 4.49 3.6 7.56 3.6c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.6 22 6.1 22 9.19c0 7-6.48 11.13-9.38 12.12Z"
      />
    </Svg>
  );
    export const EditIcon =(props:any={}) => (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={34}
          height={34}
          fill="none"
          {...props}
        >
          <Path
            fill="#1C2A3A"
            d="M22.667 2.833H11.333c-5.666 0-8.5 2.834-8.5 8.5V29.75c0 .78.638 1.417 1.417 1.417h18.417c5.666 0 8.5-2.834 8.5-8.5V11.333c0-5.666-2.834-8.5-8.5-8.5Z"
          />
          <Path
            fill="#fff"
            d="M23.445 10.568c-1.785-1.785-3.513-1.827-5.34 0l-1.12 1.12c-.099.099-.127.24-.099.368a7.42 7.42 0 0 0 5.072 5.072c.028.014.07.014.113.014.1 0 .199-.043.27-.114l1.104-1.105c.907-.906 1.346-1.77 1.346-2.649 0-.92-.439-1.799-1.346-2.706ZM20.315 17.95a6.557 6.557 0 0 1-.765-.412 5.146 5.146 0 0 1-.581-.382c-.156-.1-.34-.241-.524-.397a.576.576 0 0 1-.156-.142 9.983 9.983 0 0 1-.95-.949c-.028-.014-.07-.085-.127-.17-.099-.113-.24-.297-.382-.496a4.445 4.445 0 0 1-.354-.538 7.598 7.598 0 0 1-.397-.75c-.128-.284-.227-.54-.326-.794l-5.34 5.34c-.355.355-.68 1.007-.752 1.488l-.41 2.947c-.1.623.085 1.204.467 1.6.326.327.78.497 1.275.497.114 0 .213-.015.326-.029l2.947-.41c.481-.071 1.133-.397 1.487-.751l5.341-5.341c-.255-.1-.51-.199-.78-.312Z"
          />
        </Svg>
      );

  export const SearchIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke="#9CA3AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
      />
    </Svg>
  );
  
  export const LocationIcon =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={21}
      fill="none"
      {...props}
    >
      <Path
        fill="#1C2A3A"
        d="M17.5 6.95C16.45 2.33 12.42.25 8.88.25h-.01C5.34.25 1.3 2.32.25 6.94-.92 12.1 2.24 16.47 5.1 19.22a5.436 5.436 0 0 0 3.78 1.53c1.36 0 2.72-.51 3.77-1.53 2.86-2.75 6.02-7.11 4.85-12.27Zm-8.62 5.01a3.15 3.15 0 1 1 0-6.3 3.15 3.15 0 0 1 0 6.3Z"
      />
    </Svg>
  );

  export const DownArrow =(props:any={}) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      fill="none"
      {...props}
    >
      <Path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M12.37 5.72 8.567 9.525c-.45.45-1.185.45-1.634 0L3.13 5.721"
      />
    </Svg>
  );