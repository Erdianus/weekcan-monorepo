import type { SVGProps, JSX } from "react";

const size = 64;
const Sunrise = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 64 64"
    >
      <path
        fill="#fbb041"
        d="M63.716 56.818a6.84 6.84 0 0 1-6.842 6.846H7.101a6.84 6.84 0 0 1-6.838-6.846V7.049A6.84 6.84 0 0 1 7.101.208h49.775a6.84 6.84 0 0 1 6.84 6.841z"
      ></path>
      <path
        fill="#fbed21"
        d="M49.944 44.541c.288-.955.526-1.934.658-2.951h-25.2c.883.174 17.193 2.781 24.54 2.951M30.23 58.5c.336.02.667.051 1.01.051c4.542 0 8.7-1.57 12.01-4.172c-3.978.789-12.545 3.922-13.02 4.121"
        opacity={0.52}
      ></path>
      <path
        fill="#ff0"
        d="M30.377 17.05c-12.09 0-21.879 9.799-21.879 21.879c0 2.416.407 4.734 1.128 6.906h41.501a21.9 21.9 0 0 0 1.132-6.906c0-12.08-9.797-21.879-21.882-21.879"
      ></path>
      <path
        fill="#f7ed4c"
        d="m6.347 32.21l-6.06-1.689v4.281l5.383.727c.15-1.121.381-2.238.68-3.319m48.96 6.724c0 1.156-.081 2.311-.232 3.434l7.212.984a7 7 0 0 0 1.444-2.881v-1.648H55.31zM13.333 20.729L.293 6.797c-.003.084-.013.167-.013.252v7.47l10.719 8.713a25 25 0 0 1 2.33-2.503M9.03 26.02L.282 20.699v5.218l7.188 3.115a24 24 0 0 1 1.56-3.01M5.674 42.39a25 25 0 0 1-.234-3.42l-5.155.002v1.463a6.9 6.9 0 0 0 1.133 2.539zM53.25 28.966l10.491-4.581v-5.793l-12.05 7.373c.587.96 1.113 1.972 1.561 3M50.36.208l-8.556 16.546c1 .518 1.974 1.113 2.904 1.765L57.594.243a7 7 0 0 0-.692-.035zm-.653 22.972l14.03-11.46V7.052a6.8 6.8 0 0 0-.762-3.128L47.368 20.685a26 26 0 0 1 2.338 2.495m5.374 12.263l8.661-1.195v-4.736l-9.351 2.634a25 25 0 0 1 .69 3.297M38.7 15.413L44.077.209h-5.696L35.45 14.506c1.096.227 2.191.531 3.25.907m-13.47-.892L22.25.208h-5.696l5.436 15.227a24 24 0 0 1 3.24-.914m5.144-.522c.585-.021 1.137.018 1.699.055L32.986.208H27.65l.953 13.851a26 26 0 0 1 1.771-.06m-11.478 2.786L10.262.208h-3.14a6.8 6.8 0 0 0-3.466.951l12.333 17.402a25 25 0 0 1 2.907-1.776"
      ></path>
      <path
        fill="#368eba"
        d="M28.468 44.44c-11.266 3.852-22.19 4.246-28.21 4.08V60.6c0 3.779 3.061 3.063 6.838 3.063h49.775c3.78 0 6.84.428 6.84-3.352V44.442h-35.25"
      ></path>
      <path fill="#85bde8" d="M.262 41.59h63.45V61.6H.262z"></path>
      <path
        fill="#368eba"
        d="M41.864 53.3c-13.246.891-29.29 1.775-41.602-4.4v12.773h63.45V47.675c-6.662 3.51-14.626 5.137-21.852 5.625"
      ></path>
      <path
        fill="#fbed21"
        d="M30.21 44.16c-4.488-.742-8.945-1.746-13.418-2.566H8.496c.22 1.664.645 3.262 1.228 4.781c8.774 1.107 17.472 2.963 26.328 3.227c4.092.123 8.101-.078 12.08-.439a21.6 21.6 0 0 0 1.529-3.375c-6.515-.05-12.848-.528-19.45-1.628"
        opacity={0.52}
      ></path>
      <path
        fill="#fbed21"
        d="M36.421 50.584c-8.836-.262-17.474-1.881-26.19-3.02a21.4 21.4 0 0 0 4.394 6.33c10.829-1.107 21.615-2.865 32.476-3.035c.161-.234.294-.492.45-.734c-3.669.366-7.36.575-11.127.464m-4.88 7.611c3.568-1.5 7.19-2.92 11.04-3.504c.429-.064.857-.115 1.282-.176c.936-.85 1.81-1.756 2.583-2.758c-10.413.055-20.765 1.639-31.14 2.787a21.2 21.2 0 0 0 11.956 5.393A171 171 0 0 0 31.55 58.2"
        opacity={0.52}
      ></path>
      <path
        fill="#fbed21"
        d="M2.702 58.5c.337.02.669.051 1.01.051c4.543 0 8.703-1.57 12.01-4.172c-3.971.789-12.539 3.922-13.02 4.121m32.272-15.838c.313.127.616.266.938.375c4.296 1.479 8.741 1.346 12.713-.039c-4.01-.547-13.13-.369-13.651-.336M27.865 61.55c-.336.02-.671.049-1.01.049c-4.544 0-8.703-1.57-12.01-4.172c3.968.789 12.539 3.922 13.02 4.123M61.7 48.51c-.241.016-.479.037-.72.037c-3.226 0-6.18-1.113-8.53-2.961c2.827.564 8.908 2.783 9.25 2.924m-12.741 3.87c.118.004.241.018.36.018a6.85 6.85 0 0 0 4.261-1.48c-1.409.282-4.447 1.39-4.621 1.462M2.246 46c.124.004.238.02.364.02a6.9 6.9 0 0 0 4.261-1.48C5.46 44.818 2.42 45.928 2.246 46"
        opacity={0.52}
      ></path>
    </svg>
  );
};

const Noon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 32 32"
    >
      <g fill="none">
        <g clipPath="url(#f265id1r)">
          <g filter="url(#f265idw)">
            <rect
              width={28}
              height={28}
              x={2}
              y={1.964}
              fill="url(#f265id0)"
              rx={4}
            ></rect>
            <rect
              width={28}
              height={28}
              x={2}
              y={1.964}
              fill="url(#f265id1)"
              rx={4}
            ></rect>
            <rect
              width={28}
              height={28}
              x={2}
              y={1.964}
              fill="url(#f265id2)"
              rx={4}
            ></rect>
            <rect
              width={28}
              height={28}
              x={2}
              y={1.964}
              fill="url(#f265id1n)"
              rx={4}
            ></rect>
            <rect
              width={28}
              height={28}
              x={2}
              y={1.964}
              fill="url(#f265id1o)"
              rx={4}
            ></rect>
          </g>
          <g filter="url(#f265idx)">
            <path
              fill="#2d2934"
              d="M18 29.787h8a4 4 0 0 0 2-.535V17.037c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
            ></path>
            <path
              fill="url(#f265id3)"
              d="M18 29.787h8a4 4 0 0 0 2-.535V17.037c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
            ></path>
          </g>
          <g filter="url(#f265idy)">
            <path
              fill="#316fab"
              d="M18 29.787h8a4 4 0 0 0 2-.535V17.037c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
            ></path>
            <path
              fill="url(#f265id4)"
              d="M18 29.787h8a4 4 0 0 0 2-.535V17.037c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
            ></path>
          </g>
          <path
            fill="url(#f265id5)"
            d="M18 29.787h8a4 4 0 0 0 2-.535V17.037c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
          ></path>
          <g filter="url(#f265idz)">
            <path
              fill="#d9d5ff"
              d="M19.087 11.768a2.466 2.466 0 1 1 .865-4.776c.339.127.774-.018.939-.34a3.513 3.513 0 1 1 3.266 5.113v.003z"
            ></path>
            <path
              fill="url(#f265id6)"
              d="M19.087 11.768a2.466 2.466 0 1 1 .865-4.776c.339.127.774-.018.939-.34a3.513 3.513 0 1 1 3.266 5.113v.003z"
            ></path>
          </g>
          <g filter="url(#f265id10)">
            <path
              fill="#d6d5ff"
              d="M14.778 6.764a1.112 1.112 0 1 1 .427-2.139c.133.056.306-.002.369-.132a1.584 1.584 0 1 1 1.49 2.27z"
            ></path>
            <path
              fill="url(#f265id7)"
              d="M14.778 6.764a1.112 1.112 0 1 1 .427-2.139c.133.056.306-.002.369-.132a1.584 1.584 0 1 1 1.49 2.27z"
            ></path>
          </g>
          <g filter="url(#f265id11)">
            <path
              fill="#3495de"
              d="M6 29.787h7V7.037c0-.69-.56-1.25-1.25-1.25h-1.5c-.69 0-1.25.56-1.25 1.25v.75H5.25c-.69 0-1.25.56-1.25 1.25v20.215c.588.34 1.271.535 2 .535"
            ></path>
            <path
              fill="url(#f265id8)"
              d="M6 29.787h7V7.037c0-.69-.56-1.25-1.25-1.25h-1.5c-.69 0-1.25.56-1.25 1.25v.75H5.25c-.69 0-1.25.56-1.25 1.25v20.215c.588.34 1.271.535 2 .535"
            ></path>
          </g>
          <path
            fill="url(#f265id9)"
            d="M6 29.787h7V7.037c0-.69-.56-1.25-1.25-1.25h-1.5c-.69 0-1.25.56-1.25 1.25v.75H5.25c-.69 0-1.25.56-1.25 1.25v20.215c.588.34 1.271.535 2 .535"
          ></path>
          <g filter="url(#f265id12)">
            <path
              fill="url(#f265ida)"
              d="M23 29.787h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
            ></path>
          </g>
          <g filter="url(#f265id13)">
            <path
              fill="url(#f265idb)"
              d="M23 29.787h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
            ></path>
          </g>
          <path
            fill="url(#f265idc)"
            d="M23 29.787h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
          ></path>
          <g filter="url(#f265id14)">
            <path
              fill="url(#f265idd)"
              d="M2 13.787v12a4 4 0 0 0 4 4h1v-14.75c0-.69-.56-1.25-1.25-1.25z"
            ></path>
          </g>
          <path
            fill="url(#f265ide)"
            d="M2 13.787v12a4 4 0 0 0 4 4h1v-14.75c0-.69-.56-1.25-1.25-1.25z"
          ></path>
          <g filter="url(#f265id15)">
            <path
              fill="url(#f265idf)"
              d="M9 29.787h12v-5.75c0-.69-.56-1.25-1.25-1.25H19v-10.75c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
            ></path>
          </g>
          <path
            fill="url(#f265idg)"
            d="M9 29.787h12v-5.75c0-.69-.56-1.25-1.25-1.25H19v-10.75c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
          ></path>
          <g filter="url(#f265id16)">
            <path
              fill="url(#f265idh)"
              fillRule="evenodd"
              d="M30 24.787h-5a1 1 0 1 0 0 2h4.874a4 4 0 0 0 .126-1z"
              clipRule="evenodd"
            ></path>
          </g>
          <g filter="url(#f265id17)">
            <path
              fill="url(#f265idi)"
              d="M24 21.787a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1"
            ></path>
          </g>
          <g filter="url(#f265id18)">
            <rect
              width={1.961}
              height={1.96}
              x={15.02}
              y={12.803}
              fill="url(#f265idj)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id19)">
            <rect
              width={1.961}
              height={1.96}
              x={11.02}
              y={12.803}
              fill="url(#f265idk)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1a)">
            <rect
              width={1.961}
              height={1.96}
              x={3.02}
              y={15.807}
              fill="url(#f265idl)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1b)">
            <rect
              width={1.961}
              height={1.96}
              x={3.02}
              y={19.807}
              fill="url(#f265idm)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1c)">
            <rect
              width={1.961}
              height={1.96}
              x={3.02}
              y={23.807}
              fill="url(#f265idn)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1d)">
            <rect
              width={1.961}
              height={1.96}
              x={15.02}
              y={16.807}
              fill="url(#f265ido)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1e)">
            <rect
              width={1.961}
              height={1.96}
              x={15.02}
              y={20.811}
              fill="url(#f265idp)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1f)">
            <rect
              width={1.961}
              height={1.96}
              x={15.02}
              y={24.816}
              fill="url(#f265idq)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1g)">
            <rect
              width={1.961}
              height={1.96}
              x={11.02}
              y={16.807}
              fill="url(#f265idr)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1h)">
            <rect
              width={1.961}
              height={1.96}
              x={11.02}
              y={20.811}
              fill="url(#f265ids)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1i)">
            <rect
              width={1.961}
              height={1.96}
              x={11.02}
              y={24.816}
              fill="url(#f265idt)"
              rx={0.3}
            ></rect>
          </g>
          <g filter="url(#f265id1j)">
            <path
              fill="url(#f265idu)"
              d="M20.923 8.432c-.11-.7-.597-1.165-1.333-1.165s-1.333.522-1.333 1.165c0 .233.079.45.214.632l.13.189a3 3 0 0 0 2.469 1.295h1.34l-.64-.373a1.43 1.43 0 0 1-.688-.945c-.056-.276-.109-.554-.159-.798"
            ></path>
          </g>
          <g filter="url(#f265id1k)">
            <path
              fill="url(#f265idv)"
              d="M15.606 5.26c-.05-.315-.27-.525-.6-.525c-.333 0-.602.235-.602.525c0 .105.036.203.096.285c.29.42.766.67 1.275.67h.501a1.38 1.38 0 0 1-.663-.923z"
            ></path>
          </g>
          <g filter="url(#f265id1l)">
            <circle
              cx={24.332}
              cy={7.771}
              r={2.547}
              fill="url(#f265id1p)"
            ></circle>
          </g>
          <g filter="url(#f265id1m)">
            <circle
              cx={17.143}
              cy={4.962}
              r={1.148}
              fill="url(#f265id1q)"
            ></circle>
          </g>
        </g>
        <defs>
          <linearGradient
            id="f265id0"
            x1={16}
            x2={16}
            y1={4.159}
            y2={15.026}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#51d9fb"></stop>
            <stop offset={1} stopColor="#a4dcff"></stop>
          </linearGradient>
          <linearGradient
            id="f265id1"
            x1={1.508}
            x2={6.519}
            y1={12.661}
            y2={12.661}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6ec5e3"></stop>
            <stop offset={1} stopColor="#6ec5e3" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id2"
            x1={16}
            x2={16}
            y1={1.17}
            y2={5.017}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3ecae6"></stop>
            <stop offset={1} stopColor="#3ecae6" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id3"
            x1={21.063}
            x2={21.051}
            y1={28.632}
            y2={19.448}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#210b39"></stop>
            <stop offset={0.517} stopColor="#180d25"></stop>
            <stop offset={1} stopColor="#180d25" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id4"
            x1={21.105}
            x2={21.073}
            y1={24.828}
            y2={19.448}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#214997"></stop>
            <stop offset={1} stopColor="#214997" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id5"
            x1={21.105}
            x2={21.044}
            y1={29.787}
            y2={19.449}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#214997"></stop>
            <stop offset={1} stopColor="#214997" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id6"
            x1={21.715}
            x2={21.715}
            y1={13.252}
            y2={9.953}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#bcb7ff"></stop>
            <stop offset={1} stopColor="#bcb7ff" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id7"
            x1={15.963}
            x2={15.963}
            y1={7.433}
            y2={5.946}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#bcb7ff"></stop>
            <stop offset={1} stopColor="#bcb7ff" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id8"
            x1={6.795}
            x2={6.69}
            y1={21.287}
            y2={12.065}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#214997"></stop>
            <stop offset={1} stopColor="#214997" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265id9"
            x1={6.795}
            x2={6.69}
            y1={21.287}
            y2={12.065}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#214997"></stop>
            <stop offset={1} stopColor="#214997" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265ida"
            x1={27.083}
            x2={27.083}
            y1={18.787}
            y2={25.653}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4791cd"></stop>
            <stop offset={1} stopColor="#a1a0b4"></stop>
          </linearGradient>
          <linearGradient
            id="f265idb"
            x1={27.083}
            x2={27.083}
            y1={18.787}
            y2={25.653}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b89e5"></stop>
            <stop offset={1} stopColor="#3d65c4"></stop>
          </linearGradient>
          <linearGradient
            id="f265idc"
            x1={26.5}
            x2={26.5}
            y1={18.787}
            y2={19.026}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1988d7"></stop>
            <stop offset={1} stopColor="#1988d7" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265idd"
            x1={4.917}
            x2={4.917}
            y1={13.787}
            y2={23.774}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3ba0fd"></stop>
            <stop offset={1} stopColor="#3e67c7"></stop>
          </linearGradient>
          <linearGradient
            id="f265ide"
            x1={4.5}
            x2={4.5}
            y1={13.787}
            y2={14.135}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1b99e8"></stop>
            <stop offset={1} stopColor="#1b99e8" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265idf"
            x1={16}
            x2={16}
            y1={10.787}
            y2={22.646}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3ba0fd"></stop>
            <stop offset={1} stopColor="#3e67c7"></stop>
          </linearGradient>
          <linearGradient
            id="f265idg"
            x1={15}
            x2={15}
            y1={10.787}
            y2={11.2}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1b99e8"></stop>
            <stop offset={1} stopColor="#1b99e8" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265idh"
            x1={27}
            x2={27}
            y1={25.343}
            y2={26.787}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffe07b"></stop>
            <stop offset={1} stopColor="#fff670"></stop>
            <stop offset={1} stopColor="#ffff73"></stop>
          </linearGradient>
          <linearGradient
            id="f265idi"
            x1={27}
            x2={27}
            y1={21.343}
            y2={22.787}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffe07b"></stop>
            <stop offset={1} stopColor="#fff670"></stop>
            <stop offset={1} stopColor="#ffff73"></stop>
          </linearGradient>
          <linearGradient
            id="f265idj"
            x1={16.98}
            x2={15.02}
            y1={12.803}
            y2={14.762}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f265idk"
            x1={12.98}
            x2={11.375}
            y1={13.22}
            y2={14.762}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265idl"
            x1={4.98}
            x2={3.02}
            y1={15.807}
            y2={17.767}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f265idm"
            x1={4.98}
            x2={3.375}
            y1={20.224}
            y2={21.767}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265idn"
            x1={4.98}
            x2={3.375}
            y1={24.224}
            y2={25.767}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265ido"
            x1={16.98}
            x2={15.375}
            y1={17.224}
            y2={18.767}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265idp"
            x1={16.98}
            x2={15.375}
            y1={21.229}
            y2={22.771}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265idq"
            x1={16.98}
            x2={15.02}
            y1={24.816}
            y2={26.776}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f265idr"
            x1={12.98}
            x2={11.375}
            y1={17.224}
            y2={18.767}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265ids"
            x1={12.98}
            x2={11.02}
            y1={20.811}
            y2={22.771}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f265idt"
            x1={12.98}
            x2={11.375}
            y1={25.233}
            y2={26.776}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffdc73"></stop>
            <stop offset={1} stopColor="#ffff7f"></stop>
          </linearGradient>
          <linearGradient
            id="f265idu"
            x1={20.588}
            x2={17.858}
            y1={7.768}
            y2={10.982}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#eceaff"></stop>
            <stop offset={1} stopColor="#eceaff" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f265idv"
            x1={15.455}
            x2={14.224}
            y1={4.961}
            y2={6.41}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#eceaff"></stop>
            <stop offset={1} stopColor="#eceaff" stopOpacity={0}></stop>
          </linearGradient>
          <filter
            id="f265idw"
            width={28.15}
            height={28.15}
            x={2}
            y={1.964}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.3}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.219608 0 0 0 0 0.690196 0 0 0 0 0.780392 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265idx"
            width={10.4}
            height={14.4}
            x={17.8}
            y={15.587}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.27451 0 0 0 0 0.266667 0 0 0 0 0.282353 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2} dy={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0509804 0 0 0 0 0.027451 0 0 0 0 0.0823529 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7834"
              result="effect2_innerShadow_18_7834"
            ></feBlend>
          </filter>
          <filter
            id="f265idy"
            width={10.4}
            height={14.4}
            x={17.8}
            y={15.587}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.603922 0 0 0 0 0.862745 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2} dy={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.184314 0 0 0 0 0.478431 0 0 0 0 0.705882 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7834"
              result="effect2_innerShadow_18_7834"
            ></feBlend>
          </filter>
          <filter
            id="f265idz"
            width={11.06}
            height={7.027}
            x={16.622}
            y={4.741}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.5}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.741176 0 0 0 0 0.717647 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id10"
            width={5.069}
            height={3.168}
            x={13.667}
            y={3.596}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.25}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.741176 0 0 0 0 0.717647 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id11"
            width={9.4}
            height={24.4}
            x={3.8}
            y={5.587}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.603922 0 0 0 0 0.862745 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2} dy={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.184314 0 0 0 0 0.478431 0 0 0 0 0.705882 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7834"
              result="effect2_innerShadow_18_7834"
            ></feBlend>
          </filter>
          <filter
            id="f265id12"
            width={7.2}
            height={11}
            x={23}
            y={18.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.356863 0 0 0 0 0.501961 0 0 0 0 0.666667 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id13"
            width={7.2}
            height={11}
            x={23}
            y={18.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.129412 0 0 0 0 0.309804 0 0 0 0 0.682353 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id14"
            width={5.2}
            height={16}
            x={1.8}
            y={13.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.321569 0 0 0 0 0.529412 0 0 0 0 0.835294 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id15"
            width={12.4}
            height={19}
            x={8.8}
            y={10.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.321569 0 0 0 0 0.529412 0 0 0 0 0.835294 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.223529 0 0 0 0 0.470588 0 0 0 0 0.788235 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7834"
              result="effect2_innerShadow_18_7834"
            ></feBlend>
          </filter>
          <filter
            id="f265id16"
            width={6.1}
            height={2.2}
            x={24}
            y={24.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.1} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.921569 0 0 0 0 0.666667 0 0 0 0 0.403922 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id17"
            width={6.1}
            height={2.2}
            x={24}
            y={20.787}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.1} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.921569 0 0 0 0 0.666667 0 0 0 0 0.403922 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id18"
            width={2.161}
            height={2.16}
            x={14.819}
            y={12.803}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id19"
            width={2.161}
            height={2.16}
            x={10.819}
            y={12.803}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1a"
            width={2.161}
            height={2.16}
            x={2.82}
            y={15.807}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1b"
            width={2.161}
            height={2.16}
            x={2.82}
            y={19.807}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1c"
            width={2.161}
            height={2.16}
            x={2.82}
            y={23.807}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1d"
            width={2.161}
            height={2.16}
            x={14.819}
            y={16.807}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1e"
            width={2.161}
            height={2.16}
            x={14.819}
            y={20.811}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1f"
            width={2.161}
            height={2.16}
            x={14.819}
            y={24.816}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1g"
            width={2.161}
            height={2.16}
            x={10.819}
            y={16.807}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1h"
            width={2.161}
            height={2.16}
            x={10.819}
            y={20.811}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1i"
            width={2.161}
            height={2.16}
            x={10.819}
            y={24.816}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.968627 0 0 0 0 0.72549 0 0 0 0 0.392157 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7834"></feBlend>
          </filter>
          <filter
            id="f265id1j"
            width={6.153}
            height={5.281}
            x={17.257}
            y={6.267}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              result="effect1_foregroundBlur_18_7834"
              stdDeviation={0.5}
            ></feGaussianBlur>
          </filter>
          <filter
            id="f265id1k"
            width={2.872}
            height={2.479}
            x={13.904}
            y={4.235}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              result="effect1_foregroundBlur_18_7834"
              stdDeviation={0.25}
            ></feGaussianBlur>
          </filter>
          <filter
            id="f265id1l"
            width={7.094}
            height={7.094}
            x={20.785}
            y={4.224}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              result="effect1_foregroundBlur_18_7834"
              stdDeviation={0.5}
            ></feGaussianBlur>
          </filter>
          <filter
            id="f265id1m"
            width={3.296}
            height={3.296}
            x={15.495}
            y={3.314}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              result="effect1_foregroundBlur_18_7834"
              stdDeviation={0.25}
            ></feGaussianBlur>
          </filter>
          <radialGradient
            id="f265id1n"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-2.88545 0 0 -13.2123 28.49 18.634)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b4e7ff"></stop>
            <stop offset={1} stopColor="#b4e7ff" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f265id1o"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="rotate(135 14.087 7.855)scale(2.36248 3.41339)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60e0ff"></stop>
            <stop offset={1} stopColor="#60e0ff" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f265id1p"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-2.40623 2.15626 -2.6807 -2.99147 25.75 6.787)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ebe8ff"></stop>
            <stop offset={1} stopColor="#eceaff" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f265id1q"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-1.08482 .97212 -1.20856 -1.34867 17.782 4.518)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ebe8ff"></stop>
            <stop offset={1} stopColor="#eceaff" stopOpacity={0}></stop>
          </radialGradient>
          <clipPath id="f265id1r">
            <path fill="#fff" d="M0 0h32v32H0z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};

const Sunset = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 128 128"
    >
      <radialGradient
        id="notoSunset0"
        cx={88.195}
        cy={51.501}
        r={56.382}
        gradientTransform="matrix(0 -1 1.8259 0 -5.84 139.696)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.158} stopColor="#febc45"></stop>
        <stop offset={0.201} stopColor="#f8ae44"></stop>
        <stop offset={0.328} stopColor="#e98b40"></stop>
        <stop offset={0.432} stopColor="#e0763e"></stop>
        <stop offset={0.5} stopColor="#dd6e3d"></stop>
        <stop offset={0.76} stopColor="#c05e5d"></stop>
        <stop offset={0.99} stopColor="#a95e75"></stop>
      </radialGradient>
      <path
        fill="url(#notoSunset0)"
        d="M116.62 124.26H11.32c-4.15 0-7.52-3.37-7.52-7.52V11.44c0-4.15 3.37-7.52 7.52-7.52h105.3c4.15 0 7.52 3.37 7.52 7.52v105.3c.01 4.15-3.36 7.52-7.52 7.52"
      ></path>
      <radialGradient
        id="notoSunset1"
        cx={25.529}
        cy={113.093}
        r={140.58}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.817} stopColor="#dd6e3d" stopOpacity={0}></stop>
        <stop offset={0.936} stopColor="#b86365" stopOpacity={0.651}></stop>
        <stop offset={1} stopColor="#a95e75"></stop>
      </radialGradient>
      <path
        fill="url(#notoSunset1)"
        d="M116.62 124.26H11.32c-4.15 0-7.52-3.37-7.52-7.52V11.44c0-4.15 3.37-7.52 7.52-7.52h105.3c4.15 0 7.52 3.37 7.52 7.52v105.3c.01 4.15-3.36 7.52-7.52 7.52"
      ></path>
      <radialGradient
        id="notoSunset2"
        cx={87.87}
        cy={113.71}
        r={112.193}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.411} stopColor="#fd960c"></stop>
        <stop offset={0.61} stopColor="#f2811b" stopOpacity={0.662}></stop>
        <stop offset={0.833} stopColor="#ea7028" stopOpacity={0.283}></stop>
        <stop offset={1} stopColor="#e76a2c" stopOpacity={0}></stop>
      </radialGradient>
      <path
        fill="url(#notoSunset2)"
        d="M116.62 124.26H11.32c-4.15 0-7.52-3.37-7.52-7.52V11.44c0-4.15 3.37-7.52 7.52-7.52h105.3c4.15 0 7.52 3.37 7.52 7.52v105.3c.01 4.15-3.36 7.52-7.52 7.52"
      ></path>
      <circle cx={91.87} cy={49.17} r={13.26} fill="#fef7b2"></circle>
      <path
        fill="#d17757"
        d="M121.3 62.39h-19v21.86H60.19V18.84H28.65v65.41h-4.48V49.13H12.34v42.65h9.5v25.44h97.13v-11.11h2.33z"
      ></path>
      <path
        fill="#3f737b"
        d="M32.41 25.13h2.37v7.59h-2.37zm5.05 0h2.47v7.59h-2.47zm7.81 0h-2.42v7.59l2.36-.02z"
      ></path>
      <path
        fill="#ffe066"
        d="m50.44 25.13l-2.6.01l.07 7.58h2.51zm-18.03 0h2.37v7.59h-2.37zm5.05 0h2.47v7.59h-2.47zm7.85 0h-2.46v7.59l2.43-.02zm5.13 12l-2.6.01l.07 7.58h2.51zm-18.03 0h2.37v7.59h-2.37zm5.05 0h2.47v7.59h-2.47zm7.85 0h-2.46v7.59l2.43-.02zm-12.9 12h2.37v7.59h-2.37zm5.05 0h2.47v7.59h-2.47zm7.85 0h-2.46v7.59l2.43-.02zm8.05-24l-.01 7.59h2.56v-7.59z"
      ></path>
      <path
        fill="#ffb65a"
        d="M105.55 81.2h2.88v3.94h-2.88zm5.75 0h2.88v3.94h-2.88z"
      ></path>
      <path
        fill="#ffc55c"
        d="M105.55 73.83h2.88v3.94h-2.88zm5.75 0h2.88v3.94h-2.88z"
      ></path>
      <path
        fill="#ffd360"
        d="M105.55 66.83h2.88v3.94h-2.88zm5.75 0h2.88v3.94h-2.88z"
      ></path>
      <radialGradient
        id="notoSunset3"
        cx={56.989}
        cy={23.279}
        r={100.394}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.51} stopColor="#911f4e"></stop>
        <stop offset={0.934} stopColor="#6d0c36"></stop>
      </radialGradient>
      <path
        fill="url(#notoSunset3)"
        d="M115 49.4c-.36.73 0 42.7 0 42.7H99.13v-24h-5.11v-7.67h-4.53v-6.51h-8.16v6.84h-5.19v7.17h-5.36v34.95h-5.04v-39h2.35v-7.44h-2.35V41.03h-2.65l-3.61-11.16h-7.11L48.8 41.03h-2.79v15.41h-2.48v7.44h2.48v39h-7.18V67.83H17.19V28.47s-13.35-.09-13.39-.05v88.32c0 4.15 3.37 7.52 7.52 7.52h105.3c4.15 0 7.52-3.37 7.52-7.52V49.4z"
      ></path>
      <path fill="#fc7143" d="M5.71 116.21h29.97v2.35H5.71z"></path>
      <path fill="#fc7444" d="M5.71 107.86h29.97v2.35H5.71z"></path>
      <path fill="#fc7c47" d="M5.71 99.21h29.97v2.35H5.71z"></path>
      <path fill="#fd894a" d="M5.71 90.86h29.97v2.35H5.71z"></path>
      <path fill="#fda152" d="M5.71 81.21h29.97v2.35H5.71z"></path>
      <path fill="#fcb95a" d="M5.71 72.86h29.97v2.35H5.71z"></path>
      <path
        fill="#fedc61"
        d="M5.71 63.32h1.76v3.7H5.71zm6 0h1.76v3.7h-1.76zm-6-7.43h1.76v3.7H5.71zm6 0h1.76v3.7h-1.76zm-6-7.43h1.76v3.7H5.71zm6 0h1.76v3.7h-1.76zm-6-7.43h1.76v3.7H5.71zm6 0h1.76v3.7h-1.76zm-6-7.44h1.76v3.7H5.71zm6 0h1.76v3.7h-1.76z"
      ></path>
      <path
        fill="#fece60"
        d="M49.8 64.51h2.27v4.76H49.8zm5.38 0h2.27v4.76h-2.27zm5.18 0h2.27v4.76h-2.27z"
      ></path>
      <path
        fill="#fe7a47"
        d="M49.8 97.7h2.27v4.76H49.8zm5.38 0h2.27v4.76h-2.27zm5.18 0h2.27v4.76h-2.27z"
      ></path>
      <path
        fill="#fcb757"
        d="M49.8 73.51h2.27v4.76H49.8zm5.38 0h2.27v4.76h-2.27zm5.18 0h2.27v4.76h-2.27z"
      ></path>
      <path
        fill="#fe9c51"
        d="M49.8 82.51h2.27v4.76H49.8zm5.38 0h2.27v4.76h-2.27zm5.18 0h2.27v4.76h-2.27z"
      ></path>
      <path
        fill="#fdcb61"
        d="M54.01 53.96h4.66v-6.92s.17-2.6-2.35-2.66c-2.37-.06-2.4 2.6-2.4 2.6s.15 6.98.09 6.98"
      ></path>
      <path
        fill="#ffcf62"
        d="M79.85 64.16h2.27v9.69h-2.27zm8.51 0h2.27v9.69h-2.27zm-4.21 0h2.27v9.69h-2.27z"
      ></path>
      <path
        fill="#feb359"
        d="M76.37 77.58h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27z"
      ></path>
      <path
        fill="#ff9a4f"
        d="M76.37 87.58h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27z"
      ></path>
      <path
        fill="#ff844b"
        d="M76.37 97.03h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27z"
      ></path>
      <path
        fill="#ff7942"
        d="M76.37 107.03h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27z"
      ></path>
      <path
        fill="#fc7544"
        d="M76.37 116.5h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27zm7.82 0h2.27v3.09h-2.27z"
      ></path>
      <path
        fill="#fff6b2"
        d="m23.11 49.173l2-.006l.06 18.65l-2 .006zm-7.012-20.687h2v39.39h-2zm86.206 34.865l.006-2l11.86.036l-.006 2z"
      ></path>
      <path
        fill="#fff6b2"
        d="m99.13 93.11l-.01-2L114 91.1V48.4l10.16.01l-.01 2l-8.15-.01v42.7zM94.02 67.1h5.11v2h-5.11zm-17.9-7.34h5.19v2h-5.19zm-5.35 7.17h5.36v2h-5.36zm-3.05 35.95h-2v-40h2.35v-5.44h-2.35V42.03h-2.38l-3.88-12l.03-11.18h2l-.03 10.86l.25.74l3.09 9.58h2.92v15.41h2.35v9.44h-2.35z"
      ></path>
      <radialGradient
        id="notoSunset4"
        cx={91.818}
        cy={49.529}
        r={22.854}
        gradientTransform="matrix(.0364 -1.3108 1.1462 .0376 31.606 168.045)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.198} stopColor="#fff6b2"></stop>
        <stop offset={0.767} stopColor="#fff6b2" stopOpacity={0}></stop>
      </radialGradient>
      <ellipse
        cx={92.29}
        cy={49.46}
        fill="url(#notoSunset4)"
        opacity={0.63}
        rx={28.37}
        ry={30.07}
      ></ellipse>
    </svg>
  );
};

const Night = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      viewBox="0 0 32 32"
    >
      <g fill="none">
        <rect
          width={28}
          height={28}
          x={2}
          y={2}
          fill="url(#f1498id0)"
          rx={4}
        ></rect>
        <rect
          width={28}
          height={28}
          x={2}
          y={2}
          fill="url(#f1498id1)"
          rx={4}
        ></rect>
        <rect
          width={28}
          height={28}
          x={2}
          y={2}
          fill="url(#f1498id2)"
          rx={4}
        ></rect>
        <rect
          width={28}
          height={28}
          x={2}
          y={2}
          fill="url(#f1498id3)"
          rx={4}
        ></rect>
        <rect
          width={28}
          height={28}
          x={2}
          y={2}
          fill="url(#f1498id1g)"
          rx={4}
        ></rect>
        <g filter="url(#f1498ids)">
          <path
            fill="#2d2934"
            d="M18 30h8c.729 0 1.412-.195 2-.535V17.25c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
          ></path>
          <path
            fill="url(#f1498id4)"
            d="M18 30h8c.729 0 1.412-.195 2-.535V17.25c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
          ></path>
        </g>
        <path
          fill="url(#f1498id5)"
          d="M18 30h8c.729 0 1.412-.195 2-.535V17.25c0-.69-.56-1.25-1.25-1.25h-7.5c-.69 0-1.25.56-1.25 1.25z"
        ></path>
        <g filter="url(#f1498idt)">
          <path
            fill="#2d2934"
            d="M6 30h7V7.25C13 6.56 12.44 6 11.75 6h-1.5C9.56 6 9 6.56 9 7.25V8H5.25C4.56 8 4 8.56 4 9.25v20.215c.588.34 1.271.535 2 .535"
          ></path>
          <path
            fill="url(#f1498id6)"
            d="M6 30h7V7.25C13 6.56 12.44 6 11.75 6h-1.5C9.56 6 9 6.56 9 7.25V8H5.25C4.56 8 4 8.56 4 9.25v20.215c.588.34 1.271.535 2 .535"
          ></path>
        </g>
        <g filter="url(#f1498idu)">
          <path
            fill="url(#f1498id7)"
            d="M23 30h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
          ></path>
        </g>
        <g filter="url(#f1498idv)">
          <path
            fill="url(#f1498id8)"
            d="M23 30h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
          ></path>
        </g>
        <path
          fill="url(#f1498id9)"
          d="M23 30h3a4 4 0 0 0 4-4v-7h-5.75c-.69 0-1.25.56-1.25 1.25z"
        ></path>
        <g filter="url(#f1498idw)">
          <path
            fill="url(#f1498ida)"
            d="M2 14v12a4 4 0 0 0 4 4h1V15.25C7 14.56 6.44 14 5.75 14z"
          ></path>
        </g>
        <path
          fill="url(#f1498idb)"
          d="M2 14v12a4 4 0 0 0 4 4h1V15.25C7 14.56 6.44 14 5.75 14z"
        ></path>
        <g filter="url(#f1498idx)">
          <path
            fill="url(#f1498idc)"
            d="M9 30h12v-5.75c0-.69-.56-1.25-1.25-1.25H19V12.25c0-.69-.56-1.25-1.25-1.25h-7.5C9.56 11 9 11.56 9 12.25z"
          ></path>
        </g>
        <path
          fill="url(#f1498idd)"
          d="M9 30h12v-5.75c0-.69-.56-1.25-1.25-1.25H19V12.25c0-.69-.56-1.25-1.25-1.25h-7.5C9.56 11 9 11.56 9 12.25z"
        ></path>
        <g filter="url(#f1498idy)">
          <path
            fill="url(#f1498ide)"
            fillRule="evenodd"
            d="M30 25h-5a1 1 0 1 0 0 2h4.874A4 4 0 0 0 30 26z"
            clipRule="evenodd"
          ></path>
        </g>
        <g filter="url(#f1498idz)">
          <path
            fill="url(#f1498idf)"
            d="M24 22a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1"
          ></path>
        </g>
        <g filter="url(#f1498id10)">
          <rect
            width={1.961}
            height={1.96}
            x={15.02}
            y={13.016}
            fill="url(#f1498idg)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id11)">
          <rect
            width={1.961}
            height={1.96}
            x={11.02}
            y={13.016}
            fill="url(#f1498idh)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id12)">
          <rect
            width={1.961}
            height={1.96}
            x={3.02}
            y={16.02}
            fill="url(#f1498idi)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id13)">
          <rect
            width={1.961}
            height={1.96}
            x={3.02}
            y={20.02}
            fill="url(#f1498idj)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id14)">
          <rect
            width={1.961}
            height={1.96}
            x={3.02}
            y={24.02}
            fill="url(#f1498idk)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id15)">
          <rect
            width={1.961}
            height={1.96}
            x={15.02}
            y={17.02}
            fill="url(#f1498idl)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id16)">
          <rect
            width={1.961}
            height={1.96}
            x={15.02}
            y={21.024}
            fill="url(#f1498idm)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id17)">
          <rect
            width={1.961}
            height={1.96}
            x={15.02}
            y={25.029}
            fill="url(#f1498idn)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id18)">
          <rect
            width={1.961}
            height={1.96}
            x={11.02}
            y={17.02}
            fill="url(#f1498ido)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id19)">
          <rect
            width={1.961}
            height={1.96}
            x={11.02}
            y={21.024}
            fill="url(#f1498idp)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id1a)">
          <rect
            width={1.961}
            height={1.96}
            x={11.02}
            y={25.029}
            fill="url(#f1498idq)"
            rx={0.3}
          ></rect>
        </g>
        <g filter="url(#f1498id1b)">
          <path
            fill="#d9cedd"
            d="m27.075 11.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.223l.404.202a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
          ></path>
        </g>
        <path
          fill="url(#f1498id1h)"
          d="m27.075 11.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.223l.404.202a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <path
          fill="url(#f1498id1i)"
          d="m27.075 11.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.223l.404.202a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <g filter="url(#f1498id1c)">
          <path
            fill="#d9cedd"
            d="m21.075 3.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.224l-.404-.201a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
          ></path>
        </g>
        <path
          fill="url(#f1498id1j)"
          d="m21.075 3.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.224l-.404-.201a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <path
          fill="url(#f1498id1k)"
          d="m21.075 3.85l.201-.403a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.201a.5.5 0 0 0-.224.224l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.224l-.404-.201a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <g filter="url(#f1498id1d)">
          <path
            fill="#d9cedd"
            d="m15.908 6.684l.368-.737a.25.25 0 0 1 .448 0l.368.737a.5.5 0 0 0 .224.224l.737.368a.25.25 0 0 1 0 .448l-.737.368a.5.5 0 0 0-.224.224l-.368.737a.25.25 0 0 1-.448 0l-.368-.737a.5.5 0 0 0-.224-.224l-.737-.368a.25.25 0 0 1 0-.448l.737-.368a.5.5 0 0 0 .224-.224"
          ></path>
        </g>
        <path
          fill="url(#f1498id1l)"
          d="m15.908 6.684l.368-.737a.25.25 0 0 1 .448 0l.368.737a.5.5 0 0 0 .224.224l.737.368a.25.25 0 0 1 0 .448l-.737.368a.5.5 0 0 0-.224.224l-.368.737a.25.25 0 0 1-.448 0l-.368-.737a.5.5 0 0 0-.224-.224l-.737-.368a.25.25 0 0 1 0-.448l.737-.368a.5.5 0 0 0 .224-.224"
        ></path>
        <path
          fill="url(#f1498id1m)"
          d="m15.908 6.684l.368-.737a.25.25 0 0 1 .448 0l.368.737a.5.5 0 0 0 .224.224l.737.368a.25.25 0 0 1 0 .448l-.737.368a.5.5 0 0 0-.224.224l-.368.737a.25.25 0 0 1-.448 0l-.368-.737a.5.5 0 0 0-.224-.224l-.737-.368a.25.25 0 0 1 0-.448l.737-.368a.5.5 0 0 0 .224-.224"
        ></path>
        <g filter="url(#f1498id1e)">
          <path
            fill="#d9cedd"
            d="m5.075 3.851l.201-.404a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.202a.5.5 0 0 0-.224.223l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
          ></path>
        </g>
        <path
          fill="url(#f1498id1n)"
          d="m5.075 3.851l.201-.404a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.202a.5.5 0 0 0-.224.223l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <path
          fill="url(#f1498id1o)"
          d="m5.075 3.851l.201-.404a.25.25 0 0 1 .448 0l.201.404a.5.5 0 0 0 .224.224l.404.201a.25.25 0 0 1 0 .448l-.404.202a.5.5 0 0 0-.224.223l-.201.404a.25.25 0 0 1-.448 0l-.201-.404a.5.5 0 0 0-.224-.223l-.404-.202a.25.25 0 0 1 0-.448l.404-.201a.5.5 0 0 0 .224-.224"
        ></path>
        <g filter="url(#f1498id1f)">
          <path
            fill="url(#f1498idr)"
            d="M22.012 9.336a3.49 3.49 0 0 0 3.492-3.492c0-.296-.032-.527-.102-.801c-.036-.145.122-.23.235-.145C26.473 5.536 27 6.461 27 7.594a3.492 3.492 0 0 1-6.566 1.658c-.068-.125.072-.253.203-.197c.422.18.887.28 1.375.28"
          ></path>
        </g>
        <path
          fill="url(#f1498id1p)"
          d="M22.012 9.336a3.49 3.49 0 0 0 3.492-3.492c0-.296-.032-.527-.102-.801c-.036-.145.122-.23.235-.145C26.473 5.536 27 6.461 27 7.594a3.492 3.492 0 0 1-6.566 1.658c-.068-.125.072-.253.203-.197c.422.18.887.28 1.375.28"
        ></path>
        <defs>
          <linearGradient
            id="f1498id0"
            x1={2.563}
            x2={30}
            y1={17.75}
            y2={17.75}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#503b75"></stop>
            <stop offset={1} stopColor="#544380"></stop>
          </linearGradient>
          <linearGradient
            id="f1498id1"
            x1={2}
            x2={5.938}
            y1={12}
            y2={12}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#211438"></stop>
            <stop offset={1} stopColor="#211438" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id2"
            x1={16}
            x2={16}
            y1={1.75}
            y2={3.437}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#44315d"></stop>
            <stop offset={1} stopColor="#44315d" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id3"
            x1={30}
            x2={26.438}
            y1={12.813}
            y2={12.813}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#624d82"></stop>
            <stop offset={1} stopColor="#624d82" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id4"
            x1={21.063}
            x2={21.051}
            y1={28.845}
            y2={19.662}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#210b39"></stop>
            <stop offset={0.517} stopColor="#180d25"></stop>
            <stop offset={1} stopColor="#180d25" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id5"
            x1={23}
            x2={23}
            y1={16}
            y2={16.437}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1f1b26"></stop>
            <stop offset={1} stopColor="#1f1b26" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id6"
            x1={6.795}
            x2={6.642}
            y1={25.759}
            y2={12.278}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#210b39"></stop>
            <stop offset={0.517} stopColor="#180d25"></stop>
            <stop offset={1} stopColor="#180d25" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498id7"
            x1={27.083}
            x2={27.083}
            y1={19}
            y2={25.866}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4791cd"></stop>
            <stop offset={1} stopColor="#a1a0b4"></stop>
          </linearGradient>
          <linearGradient
            id="f1498id8"
            x1={27.083}
            x2={27.083}
            y1={19}
            y2={25.866}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#533d69"></stop>
            <stop offset={1} stopColor="#43364f"></stop>
          </linearGradient>
          <linearGradient
            id="f1498id9"
            x1={26.5}
            x2={26.5}
            y1={19}
            y2={19.239}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3e2c51"></stop>
            <stop offset={1} stopColor="#3e2c51" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498ida"
            x1={4.917}
            x2={4.917}
            y1={14}
            y2={23.987}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#533d69"></stop>
            <stop offset={1} stopColor="#43364f"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idb"
            x1={4.5}
            x2={4.5}
            y1={14}
            y2={14.348}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3e2c51"></stop>
            <stop offset={1} stopColor="#3e2c51" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498idc"
            x1={16}
            x2={16}
            y1={11}
            y2={22.86}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#533d69"></stop>
            <stop offset={1} stopColor="#43364f"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idd"
            x1={15}
            x2={15}
            y1={11}
            y2={11.413}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3e2c51"></stop>
            <stop offset={1} stopColor="#3e2c51" stopOpacity={0}></stop>
          </linearGradient>
          <linearGradient
            id="f1498ide"
            x1={27}
            x2={27}
            y1={25.556}
            y2={27}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffd77a"></stop>
            <stop offset={1} stopColor="#fff670"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idf"
            x1={27}
            x2={27}
            y1={21.556}
            y2={23}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffd77a"></stop>
            <stop offset={1} stopColor="#fff670"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idg"
            x1={16.98}
            x2={15.02}
            y1={13.016}
            y2={14.976}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idh"
            x1={12.98}
            x2={11.375}
            y1={13.433}
            y2={14.976}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idi"
            x1={4.98}
            x2={3.02}
            y1={16.02}
            y2={17.98}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idj"
            x1={4.98}
            x2={3.375}
            y1={20.438}
            y2={21.98}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idk"
            x1={4.98}
            x2={3.375}
            y1={24.438}
            y2={25.98}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idl"
            x1={16.98}
            x2={15.375}
            y1={17.438}
            y2={18.98}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idm"
            x1={16.98}
            x2={15.375}
            y1={21.442}
            y2={22.984}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idn"
            x1={16.98}
            x2={15.02}
            y1={25.029}
            y2={26.989}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f1498ido"
            x1={12.98}
            x2={11.375}
            y1={17.438}
            y2={18.98}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idp"
            x1={12.98}
            x2={11.02}
            y1={21.024}
            y2={22.984}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#282130"></stop>
            <stop offset={1} stopColor="#383739"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idq"
            x1={12.98}
            x2={11.375}
            y1={25.446}
            y2={26.989}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f2bc6c"></stop>
            <stop offset={1} stopColor="#ffff7d"></stop>
          </linearGradient>
          <linearGradient
            id="f1498idr"
            x1={21.5}
            x2={26.794}
            y1={10.75}
            y2={5.72}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e6a947"></stop>
            <stop offset={1} stopColor="#ebc364"></stop>
          </linearGradient>
          <filter
            id="f1498ids"
            width={10.4}
            height={14.4}
            x={17.8}
            y={15.8}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.27451 0 0 0 0 0.266667 0 0 0 0 0.282353 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2} dy={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0509804 0 0 0 0 0.027451 0 0 0 0 0.0823529 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498idt"
            width={9.4}
            height={24.4}
            x={3.8}
            y={5.8}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.27451 0 0 0 0 0.266667 0 0 0 0 0.282353 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2} dy={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0509804 0 0 0 0 0.027451 0 0 0 0 0.0823529 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498idu"
            width={7.2}
            height={11}
            x={23}
            y={19}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.356863 0 0 0 0 0.501961 0 0 0 0 0.666667 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498idv"
            width={7.4}
            height={11}
            x={22.8}
            y={19}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.34902 0 0 0 0 0.329412 0 0 0 0 0.364706 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.215686 0 0 0 0 0.133333 0 0 0 0 0.290196 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498idw"
            width={5.4}
            height={16}
            x={1.8}
            y={14}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.34902 0 0 0 0 0.329412 0 0 0 0 0.364706 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.215686 0 0 0 0 0.133333 0 0 0 0 0.290196 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498idx"
            width={12.4}
            height={19}
            x={8.8}
            y={11}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.34902 0 0 0 0 0.329412 0 0 0 0 0.364706 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.2}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.215686 0 0 0 0 0.133333 0 0 0 0 0.290196 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498idy"
            width={6.1}
            height={2.2}
            x={24}
            y={25}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.1} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.854902 0 0 0 0 0.580392 0 0 0 0 0.403922 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498idz"
            width={6.1}
            height={2.2}
            x={24}
            y={21}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.1} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.854902 0 0 0 0 0.580392 0 0 0 0 0.403922 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id10"
            width={2.161}
            height={2.16}
            x={14.819}
            y={13.016}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id11"
            width={2.161}
            height={2.16}
            x={10.819}
            y={13.016}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id12"
            width={2.161}
            height={2.16}
            x={2.82}
            y={16.02}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id13"
            width={2.161}
            height={2.16}
            x={2.82}
            y={20.02}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id14"
            width={2.161}
            height={2.16}
            x={2.82}
            y={24.02}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id15"
            width={2.161}
            height={2.16}
            x={14.819}
            y={17.02}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id16"
            width={2.161}
            height={2.16}
            x={14.819}
            y={21.024}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id17"
            width={2.161}
            height={2.16}
            x={14.819}
            y={25.029}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id18"
            width={2.161}
            height={2.16}
            x={10.819}
            y={17.02}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id19"
            width={2.161}
            height={2.16}
            x={10.819}
            y={21.024}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.0392157 0 0 0 0 0.0196078 0 0 0 0 0.0588235 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id1a"
            width={2.161}
            height={2.16}
            x={10.819}
            y={25.029}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.2} dy={0.2}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.85098 0 0 0 0 0.572549 0 0 0 0 0.356863 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <filter
            id="f1498id1b"
            width={2.682}
            height={2.682}
            x={26.159}
            y={11.159}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.15} dy={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.075}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.988235 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={-0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.125}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.682353 0 0 0 0 0.603922 0 0 0 0 0.733333 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498id1c"
            width={2.682}
            height={2.682}
            x={20.159}
            y={3.159}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.15} dy={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.075}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.988235 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={-0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.125}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.682353 0 0 0 0 0.603922 0 0 0 0 0.733333 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498id1d"
            width={3.682}
            height={3.682}
            x={14.659}
            y={5.659}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.15} dy={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.15}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.988235 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={-0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.125}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.682353 0 0 0 0 0.603922 0 0 0 0 0.733333 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498id1e"
            width={2.682}
            height={2.682}
            x={4.159}
            y={3.159}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={-0.15} dy={0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.075}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.988235 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={-0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.125}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.682353 0 0 0 0 0.603922 0 0 0 0 0.733333 0 0 0 1 0"></feColorMatrix>
            <feBlend
              in2="effect1_innerShadow_18_7696"
              result="effect2_innerShadow_18_7696"
            ></feBlend>
          </filter>
          <filter
            id="f1498id1f"
            width={6.734}
            height={6.372}
            x={20.416}
            y={4.714}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dx={0.15} dy={-0.15}></feOffset>
            <feGaussianBlur stdDeviation={0.3}></feGaussianBlur>
            <feComposite
              in2="hardAlpha"
              k2={-1}
              k3={1}
              operator="arithmetic"
            ></feComposite>
            <feColorMatrix values="0 0 0 0 0.466667 0 0 0 0 0.192157 0 0 0 0 0.301961 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="shape" result="effect1_innerShadow_18_7696"></feBlend>
          </filter>
          <radialGradient
            id="f1498id1g"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-2.43748 2.31252 -2.70261 -2.84866 29.313 3.125)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#634d82"></stop>
            <stop offset={1} stopColor="#634d82" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1h"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(.58053 .54118 -.6915 .7418 26.585 11.546)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1i"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-.46246 -.51165 .63412 -.57315 28.366 13.415)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1j"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(.58053 .54118 -.6915 .7418 20.585 3.546)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1k"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-.46246 -.51165 .63412 -.57315 22.366 5.414)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1l"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(.77405 .72157 -.922 .98906 15.28 6.227)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1m"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-.61662 -.6822 .8455 -.7642 17.654 8.72)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1n"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(.46094 .42969 -.54904 .58898 4.773 3.742)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1o"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(-.36719 -.40625 .50349 -.45508 6.188 5.227)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a097a2"></stop>
            <stop offset={1} stopColor="#a097a2" stopOpacity={0}></stop>
          </radialGradient>
          <radialGradient
            id="f1498id1p"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(4.55624 -1.71394 1.81369 4.82141 22.444 7.975)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.768} stopColor="#fffb8a" stopOpacity={0}></stop>
            <stop offset={1} stopColor="#fffb8a"></stop>
          </radialGradient>
        </defs>
      </g>
    </svg>
  );
};

const dailyicon: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  Pagi: Sunrise,
  Siang: Noon,
  Sore: Sunset,
  Malam: Night,
};

export { dailyicon };
