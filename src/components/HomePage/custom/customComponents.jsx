// import { css, cx } from '@emotion/css';
// import React from 'react';
// import ReactDOM from 'react-dom';

// export const EditorValue = React.forwardRef(({ className, value, ...props }, ref) => {
//     const textLines = value.document.nodes
//         .map((node) => node.text)
//         .toArray()
//         .join('\n');
//     return (
//         <div
//             ref={ref}
//             {...props}
//             className={cx(
//                 className,
//                 css`
//                     margin: 30px -20px 0;
//                 `
//             )}
//         >
//             <div
//                 className={css`
//                     font-size: 14px;
//                     padding: 5px 20px;
//                     color: #404040;
//                     border-top: 2px solid #eeeeee;
//                     background: #f8f8f8;
//                 `}
//             >
//                 Slate's value as text
//             </div>
//             <div
//                 className={css`
//                     color: #404040;
//                     font: 12px monospace;
//                     white-space: pre-wrap;
//                     padding: 10px 20px;
//                     div {
//                         margin: 0 0 0.5em;
//                     }
//                 `}
//             >
//                 {textLines}
//             </div>
//         </div>
//     );
// });

// export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
//     <div
//         {...props}
//         ref={ref}
//         className={cx(
//             className,
//             css`
//                 white-space: pre-wrap;
//                 margin: 0 -20px 10px;
//                 padding: 10px 20px;
//                 font-size: 14px;
//                 background: #f8f8e8;
//             `
//         )}
//     />
// ));

// export const Portal = ({ children }) =>
//     typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;
