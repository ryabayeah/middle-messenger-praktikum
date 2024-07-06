// TODO: Потом вынести SVG как файлы и юзать
export enum DIALOG_ICONS {
  ATTACH = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18661 12.5L13.7628 4.92389L14.7056 5.8667L7.12942 13.4428L6.18661 12.5Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70077 15.0141L16.2769 7.43793L17.2197 8.38074L9.64358 15.9569L8.70077 15.0141Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0435 20.3567L21.6197 12.7806L22.5625 13.7234L14.9864 21.2995L14.0435 20.3567Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5572 22.8708L24.1334 15.2946L25.0762 16.2374L17.5 23.8136L16.5572 22.8708Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5574 22.8709C13.9423 25.486 9.71178 25.4954 7.10829 22.8919C4.50479 20.2884 4.51421 16.0579 7.12933 13.4428L6.18652 12.5C3.04838 15.6381 3.03708 20.7148 6.16127 23.839C9.28546 26.9632 14.3621 26.9518 17.5002 23.8137L16.5574 22.8709Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6195 12.7806L22.5623 13.7234C25.003 11.2826 25.0118 7.3341 22.5819 4.90417C20.152 2.47424 16.2035 2.48304 13.7627 4.92381L14.7055 5.86662C16.6233 3.94887 19.7257 3.94196 21.6349 5.85119C23.5441 7.76042 23.5372 10.8628 21.6195 12.7806Z" fill="#3369F3"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70068 15.0144C6.95727 16.7578 6.95099 19.5782 8.68665 21.3138C10.4223 23.0495 13.2427 23.0432 14.9861 21.2998L14.0433 20.357C12.8229 21.5774 10.8486 21.5818 9.63367 20.3668C8.41871 19.1518 8.4231 17.1776 9.64349 15.9572L8.70068 15.0144Z" fill="#3369F3"/>
    </svg>`,

  SEND = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  ACTION = `<svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E" />
                        <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E" />
                        <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E" />
                    </svg>`,

  DELETE = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<line x1="4.1109" y1="4.11091" x2="11.8891" y2="11.8891" stroke="#3369F3" stroke-width="1.5"/>
<line x1="4.11078" y1="11.8891" x2="11.889" y2="4.11093" stroke="#3369F3" stroke-width="1.5"/>
</svg>`,
  ADD = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<line x1="6" y1="0.5" x2="6" y2="11.5" stroke="#3369F3" stroke-width="1.5"/>
<line x1="0.5" y1="6" x2="11.5" y2="6" stroke="#3369F3" stroke-width="1.5"/>
</svg>`,

  ATTACH_PHOTO_VIDEO = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" fill="#3369F3"/>
</svg>`,
  ATTACH_FILE = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z" fill="#3369F3"/>
</svg>`,
  ATTACH_LOCATION = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" fill="#3369F3"/>
</svg>`,
}
