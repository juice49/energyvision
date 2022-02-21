import { CSSProperties, SVGAttributes } from 'react'
import styled from 'styled-components'

const StyledLogo = styled.svg`
  display: block;
  height: 50px;
  max-width: 100%;
  box-sizing: content-box;
  fill: var(--fill);
`

type LogoProps = {
  inverted?: boolean
} & SVGAttributes<SVGElement>

export const LogoSecondary = ({ inverted = false, style, ...rest }: LogoProps) => {
  return (
    <StyledLogo
      viewBox="0 0 402 160"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden
      style={
        {
          '--fill': inverted ? 'var(--white-100)' : 'var(--energy-red-100)',
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <path d="M300.704,29.427L300.705,65.692C300.704,66.766 301.242,67.759 302.174,68.295L333.597,86.398C334.93,87.166 336.63,86.204 336.631,84.665L336.631,48.402C336.632,47.327 336.058,46.334 335.127,45.797L303.705,27.696C302.371,26.927 300.706,27.889 300.704,29.427M397.488,1.111L352.25,27.173C350.909,27.945 350.084,29.374 350.086,30.921L350.086,83.13C350.088,85.346 352.534,86.73 354.454,85.624L399.693,59.563C401.033,58.79 401.808,57.361 401.807,55.814L401.808,3.605C401.806,1.389 399.408,0.005 397.488,1.111M335.431,112.152L322.858,119.395C322.486,119.61 322.257,120.007 322.257,120.437L322.256,134.946C322.256,135.562 322.937,135.947 323.471,135.639L336.043,128.396C336.416,128.182 336.632,127.784 336.631,127.355L336.631,112.845C336.631,112.23 335.964,111.845 335.431,112.152M328.103,98.764L309.275,87.869C308.718,87.547 308.029,87.547 307.472,87.869L288.643,98.764C287.845,99.226 287.845,100.379 288.643,100.842L307.472,111.736C308.029,112.059 308.718,112.059 309.275,111.736L328.103,100.842C328.902,100.379 328.902,99.226 328.103,98.764M358.415,100.728L366.78,105.568C367.275,105.855 367.887,105.855 368.383,105.568L376.748,100.728C377.458,100.317 377.458,99.291 376.748,98.88L368.383,94.04C367.887,93.753 367.275,93.753 366.78,94.04L358.415,98.88C357.705,99.291 357.705,100.317 358.415,100.728M351.685,112.377L360.059,117.201C360.556,117.488 360.861,118.017 360.861,118.59L360.851,128.254C360.85,129.074 359.963,129.587 359.252,129.178L350.878,124.354C350.382,124.068 350.087,123.536 350.087,122.965L350.086,113.301C350.086,112.482 350.975,111.967 351.685,112.377" />
      <path d="M266.509,102.829C266.176,101.997 265.469,101.693 264.679,102.164C263.889,102.634 249.041,111.48 249.041,111.48L249.041,103.328C249.041,102.413 248.458,102.08 247.627,102.413L242.802,104.16C242.137,104.409 241.887,104.908 241.887,105.574L241.887,141.417C241.887,142.166 242.386,142.664 243.135,142.664L247.793,142.664C248.541,142.664 249.041,142.166 249.041,141.417L249.041,119.463C249.041,119.463 266.548,108.657 267.258,108.232C267.967,107.808 268.33,107.448 268.006,106.652C267.652,105.779 266.509,102.829 266.509,102.829" />
      <path d="M8.625,117.958C10.205,112.219 14.697,108.725 21.02,108.725C27.924,108.725 31.583,112.801 31.916,117.958L8.625,117.958ZM39.486,120.121C39.486,110.139 32.665,101.737 21.269,101.737C10.039,101.737 0.723,109.807 0.723,122.949C0.723,134.928 8.542,143.661 21.685,143.661C27.674,143.661 33.663,141.582 38.155,137.589C38.737,137.09 38.737,136.425 38.321,135.842L36.075,132.349C35.659,131.684 34.994,131.601 34.329,132.1C30.253,135.094 26.094,136.591 21.685,136.591C13.283,136.591 8.708,131.101 8.126,124.197L38.256,124.197C39.026,124.197 39.486,123.639 39.486,122.966L39.486,120.121Z" />
      <path d="M65.726,136.591C58.656,136.591 52.583,131.767 52.583,122.616C52.583,113.466 58.656,108.725 65.726,108.725C73.129,108.725 78.869,113.466 78.869,122.616C78.869,131.85 73.129,136.591 65.726,136.591M80.034,159.3L84.692,159.3C85.44,159.3 85.939,158.801 85.939,158.052L85.939,103.319C85.939,102.403 85.357,102.07 84.442,102.403L79.701,104.151C79.036,104.4 78.786,104.899 78.786,105.565L78.786,107.311C76.207,103.818 71.132,101.737 65.643,101.737C54.746,101.737 45.263,109.89 45.263,122.699C45.263,134.013 52.583,143.661 65.227,143.661C70.966,143.661 76.456,141.083 78.786,138.172L78.786,158.052C78.786,158.801 79.285,159.3 80.034,159.3" />
      <path d="M109.636,143.662C113.961,143.662 118.703,142.248 121.781,137.757L121.781,141.417C121.781,142.165 122.28,142.664 123.029,142.664L127.687,142.664C128.436,142.664 128.934,142.165 128.934,141.417L128.934,103.402C128.934,102.404 128.352,102.071 127.52,102.404L122.696,104.151C122.031,104.4 121.781,104.899 121.781,105.565L121.781,125.529C121.781,132.599 117.206,136.592 110.967,136.592C104.812,136.592 100.653,132.683 100.653,125.529L100.653,103.319C100.653,102.404 100.07,102.071 99.239,102.404L94.414,104.151C93.748,104.4 93.498,104.899 93.498,105.565L93.498,125.778C93.498,137.59 100.653,143.662 109.636,143.662" />
      <path d="M138.666,98.162L143.74,96.498C144.571,96.248 144.904,95.832 144.904,95.001L144.904,88.929C144.904,88.18 144.322,87.598 143.407,87.931L138.416,89.761C137.668,90.01 137.252,90.343 137.252,91.174L137.252,96.997C137.252,97.912 137.751,98.494 138.666,98.162" />
      <path d="M138.749,142.664L143.407,142.664C144.155,142.664 144.655,142.164 144.655,141.416L144.655,103.318C144.655,102.403 144.072,102.07 143.241,102.403L138.416,104.15C137.751,104.399 137.501,104.898 137.501,105.564L137.501,141.416C137.501,142.164 138,142.664 138.749,142.664" />
      <path d="M154.469,142.663L159.127,142.663C159.876,142.663 160.375,142.164 160.375,141.416L160.375,119.871C160.375,112.801 164.95,108.808 171.189,108.808C177.344,108.808 181.503,112.718 181.503,119.871L181.503,141.416C181.503,142.164 182.002,142.663 182.751,142.663L187.409,142.663C188.157,142.663 188.657,142.164 188.657,141.416L188.657,119.622C188.657,107.809 181.503,101.737 172.52,101.737C168.195,101.737 163.453,103.151 160.375,107.643L160.375,103.318C160.375,102.403 159.793,102.07 158.961,102.403L154.136,104.15C153.471,104.399 153.222,104.898 153.222,105.564L153.222,141.416C153.222,142.164 153.72,142.663 154.469,142.663" />
      <path d="M215.313,136.674C207.078,136.674 202.087,130.519 202.087,122.699C202.087,114.88 207.078,108.725 215.313,108.725C223.464,108.725 228.456,114.88 228.456,122.699C228.456,130.519 223.464,136.674 215.313,136.674M215.313,101.737C203.334,101.737 194.767,110.638 194.767,122.699C194.767,134.761 203.334,143.661 215.313,143.661C227.292,143.661 235.776,134.761 235.776,122.699C235.776,110.638 227.292,101.737 215.313,101.737" />
    </StyledLogo>
  )
}

export const LogoPrimary = ({ inverted = false, style, ...rest }: LogoProps) => (
  <StyledLogo
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 283.46 233.13"
    style={
      {
        '--fill': inverted ? 'var(--white)' : 'var(--energy-red-100)',
        ...style,
      } as CSSProperties
    }
    {...rest}
  >
    <g id="AW">
      <path
        d="M295.67,236.89a1.07,1.07,0,0,0-1.66-.6l-14.17,8.44v-7.38c0-.83-.53-1.13-1.28-.83l-4.38,1.58a1.23,1.23,0,0,0-.83,1.28v32.48a1.07,1.07,0,0,0,1.14,1.13h4.22a1.07,1.07,0,0,0,1.13-1.13V252s15.86-9.8,16.5-10.18,1-.71.68-1.43-1.35-3.47-1.35-3.47"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M90,252.56c0-9-6.18-16.65-16.51-16.65s-18.62,7.31-18.62,19.22c0,10.85,7.09,18.76,19,18.76a22.54,22.54,0,0,0,14.92-5.5,1.09,1.09,0,0,0,.15-1.58l-2-3.17a1,1,0,0,0-1.59-.22,19,19,0,0,1-11.45,4.07c-7.62,0-11.76-5-12.29-11.23h27.3A1.08,1.08,0,0,0,90,255.14Zm-28-2c1.44-5.2,5.51-8.36,11.23-8.36,6.26,0,9.58,3.69,9.88,8.36Z"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M126.7,288.06h4.22a1.07,1.07,0,0,0,1.13-1.13V237.34c0-.83-.53-1.13-1.36-.83l-4.29,1.58a1.22,1.22,0,0,0-.83,1.28V241c-2.34-3.17-6.94-5.05-11.91-5.05-9.88,0-18.47,7.38-18.47,19,0,10.25,6.63,19,18.09,19,5.2,0,10.18-2.33,12.29-5v18a1.07,1.07,0,0,0,1.13,1.13m-13-20.57c-6.4,0-11.91-4.38-11.91-12.67s5.51-12.58,11.91-12.58c6.71,0,11.91,4.29,11.91,12.58s-5.2,12.67-11.91,12.67"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M153.52,273.89c3.92,0,8.22-1.28,11-5.35v3.32a1.07,1.07,0,0,0,1.14,1.13h4.22a1.07,1.07,0,0,0,1.13-1.13V237.41c0-.9-.53-1.2-1.28-.9l-4.38,1.58a1.23,1.23,0,0,0-.83,1.28v18.09c0,6.41-4.14,10-9.79,10s-9.35-3.55-9.35-10V237.34c0-.83-.53-1.13-1.28-.83l-4.37,1.58a1.22,1.22,0,0,0-.83,1.28v18.32c0,10.7,6.48,16.2,14.62,16.2"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M179.82,232.66l4.6-1.5a1.25,1.25,0,0,0,1.06-1.36v-5.5a.94.94,0,0,0-1.36-.91l-4.52,1.66c-.68.23-1.06.53-1.06,1.28v5.28c0,.83.46,1.36,1.28,1"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M179.9,273h4.22a1.07,1.07,0,0,0,1.13-1.13V237.34c0-.83-.53-1.13-1.28-.83l-4.37,1.58a1.23,1.23,0,0,0-.83,1.28v32.49A1.07,1.07,0,0,0,179.9,273"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M194.14,273h4.23a1.07,1.07,0,0,0,1.13-1.13V252.34c0-6.41,4.14-10,9.79-10s9.35,3.54,9.35,10v19.52a1.07,1.07,0,0,0,1.13,1.13H224a1.07,1.07,0,0,0,1.13-1.13V252.11c0-10.7-6.48-16.2-14.62-16.2-3.92,0-8.22,1.28-11,5.35v-3.92c0-.83-.53-1.13-1.29-.83l-4.37,1.58a1.23,1.23,0,0,0-.83,1.28v32.49a1.07,1.07,0,0,0,1.13,1.13"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M249.28,235.91c-10.86,0-18.62,8.06-18.62,19s7.76,19,18.62,19,18.54-8.06,18.54-19-7.69-19-18.54-19m0,31.65c-7.47,0-12-5.58-12-12.66s4.52-12.66,12-12.66,11.91,5.57,11.91,12.66-4.53,12.66-11.91,12.66"
        transform="translate(-54.83 -54.93)"
      />
      <path
        d="M285.06,173.52l8.9,5.12a1.71,1.71,0,0,1,.85,1.47v10.27a1.13,1.13,0,0,1-1.7,1l-8.89-5.12a1.7,1.7,0,0,1-.84-1.48V174.5A1.13,1.13,0,0,1,285.06,173.52Zm7.15-12.38,8.89,5.14a1.67,1.67,0,0,0,1.7,0l8.88-5.14a1.13,1.13,0,0,0,0-2L302.8,154a1.72,1.72,0,0,0-1.7,0l-8.89,5.14A1.13,1.13,0,0,0,292.21,161.14ZM260,159.06l-20-11.57a1.92,1.92,0,0,0-1.91,0l-20,11.57a1.28,1.28,0,0,0,0,2.21l20,11.57a1.92,1.92,0,0,0,1.91,0l20-11.57A1.28,1.28,0,0,0,260,159.06Zm7.78,14.22L254.45,181a1.27,1.27,0,0,0-.64,1.11v15.41a.86.86,0,0,0,1.29.73l13.35-7.69a1.26,1.26,0,0,0,.63-1.11V174A.85.85,0,0,0,267.8,173.28ZM333.71,55.35,285.66,83a4.61,4.61,0,0,0-2.3,4v55.44A3.09,3.09,0,0,0,288,145.1l48.05-27.68a4.54,4.54,0,0,0,2.25-4V58A3.06,3.06,0,0,0,333.71,55.35ZM230.92,85.42v38.51a3.16,3.16,0,0,0,1.56,2.77l33.37,19.22a2.16,2.16,0,0,0,3.23-1.83V105.57a3.17,3.17,0,0,0-1.6-2.76L234.11,83.58A2.12,2.12,0,0,0,230.92,85.42Z"
        transform="translate(-54.83 -54.93)"
      />
    </g>
  </StyledLogo>
)
