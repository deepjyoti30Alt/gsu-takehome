'use client'

import { createAvatar } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';
import { AlignTop } from "@styled-icons/bootstrap"
import { usePathname } from 'next/navigation';

const Navbar = ({}) => {
    const avatar = createAvatar(miniavs, {
        seed: 'John Doe',
      });

      const pathname = usePathname();

    return pathname === '/authenticate' ? null : (
        <div className="navbar--wrapper w-full border-b">
            <div className="w-3/4 mx-auto px-4 py-2 flex items-center justify-between">
                <div className='text-blue-600'>
                    <AlignTop size="30px" />
                </div>
                <div className="user--details">
                    <div className="w-[35px] h-[35px] rounded bg-orange-200" dangerouslySetInnerHTML={{ __html: avatar.toString() }}>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;
