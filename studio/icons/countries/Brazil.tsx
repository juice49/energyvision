import React from 'react'

const Brazil = ({ width = 30, height = 30 }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{ backgroundColor: '#6da544' }}
      viewBox="0 0 512 512"
    >
      <path style={{ fill: '#ffda44' }} d="M256 100.174 467.478 256 256 411.826 44.522 256z" />
      <circle style={{ fill: '#f0f0f0' }} cx="256" cy="256" r="89.043" />
      <path
        style={{ fill: '#0052b4' }}
        d="M211.478 250.435c-15.484 0-30.427 2.355-44.493 6.725.623 48.64 40.227 87.884 89.015 87.884 30.168 0 56.812-15.017 72.919-37.968-27.557-34.497-69.958-56.641-117.441-56.641zM343.393 273.06a89.45 89.45 0 0 0 1.651-17.06c0-49.178-39.866-89.043-89.043-89.043-36.694 0-68.194 22.201-81.826 53.899a183.693 183.693 0 0 1 37.305-3.812c51.717-.001 98.503 21.497 131.913 56.016z"
      />
    </svg>
  )
}

export default Brazil
