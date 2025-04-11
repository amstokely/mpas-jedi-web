import {ReactNode} from 'react';

type HeadingProps = {
    children: ReactNode;
};

export default function Heading({children}: HeadingProps) {
    return (
        <div className="border-b border-gray-200 pb-5">
            <h3 className="text-base font-semibold text-gray-900">{children}</h3>
        </div>
    )
}
