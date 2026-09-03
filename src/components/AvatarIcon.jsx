function AvatarIcon({ type = "sprout", size = 70 }) {
  const avatars = {
    sprout: (
      <>
        <path
          d="M50 85V45"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M50 55C35 55 25 45 27 30C42 30 52 38 50 55Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50 65C65 65 75 55 73 40C58 40 48 48 50 65Z"
          fill="currentColor"
          opacity="0.55"
        />
      </>
    ),

    flower: (
      <>
        <path
          d="M50 85V55"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <circle cx="50" cy="40" r="10" fill="currentColor" />

        <circle cx="50" cy="23" r="10" fill="currentColor" opacity="0.65" />
        <circle cx="67" cy="40" r="10" fill="currentColor" opacity="0.65" />
        <circle cx="50" cy="57" r="10" fill="currentColor" opacity="0.65" />
        <circle cx="33" cy="40" r="10" fill="currentColor" opacity="0.65" />
      </>
    ),

    leaf: (
      <>
        <path
          d="M50 85V45"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M50 55C28 55 20 38 25 20C43 23 55 36 50 55Z"
          fill="currentColor"
          opacity="0.75"
        />

        <path
          d="M50 65C72 65 80 48 75 30C57 33 45 46 50 65Z"
          fill="currentColor"
          opacity="0.5"
        />
      </>
    ),

    mushroom: (
      <>
        <path
          d="M38 48H62V75C62 82 38 82 38 75Z"
          fill="currentColor"
          opacity="0.55"
        />

        <path
          d="M25 48C25 30 36 20 50 20C64 20 75 30 75 48H25Z"
          fill="currentColor"
        />

        <circle cx="39" cy="34" r="3" fill="white" />
        <circle cx="58" cy="29" r="3" fill="white" />
        <circle cx="64" cy="40" r="3" fill="white" />
      </>
    ),

    bunny: (
      <>
        <path
          d="M36 40C29 22 30 10 38 12C45 14 44 29 44 36"
          fill="currentColor"
          opacity="0.7"
        />

        <path
          d="M64 40C71 22 70 10 62 12C55 14 56 29 56 36"
          fill="currentColor"
          opacity="0.7"
        />

        <circle
          cx="50"
          cy="55"
          r="25"
          fill="currentColor"
          opacity="0.8"
        />

        <circle cx="42" cy="53" r="3" fill="white" />
        <circle cx="58" cy="53" r="3" fill="white" />

        <path
          d="M47 64Q50 67 53 64"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {avatars[type] || avatars.sprout}
    </svg>
  );
}

export default AvatarIcon;