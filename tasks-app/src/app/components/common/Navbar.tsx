'use client'

import { createAvatar, Result } from '@dicebear/core';
import { miniavs } from '@dicebear/collection';
import { AlignTop } from "@styled-icons/bootstrap"
import { usePathname } from 'next/navigation';
import { useUser } from '@/app/lib/hooks/useUser';
import { useMemo } from 'react';

const Navbar = ({}) => {
    const { user, loading: isLoading, error } = useUser()
    const avatar: Result | null = useMemo(() => {
        if (isLoading || error) return null

        return createAvatar(miniavs, {
            seed: `${user.first_name} ${user.last_name}`,
        });
    }, [user, isLoading, error])

    const pathname = usePathname();

    return pathname === '/authenticate' ? null : (
        <div className="navbar--wrapper w-full border-b">
            <div className="md:w-3/4 w-11/12 mx-auto px-4 py-2 flex items-center justify-between">
                <div className='text-blue-600'>
                    <AlignTop size="30px" />
                </div>
                <div className="user--details">
                    {!isLoading && avatar && (
                        <div className="w-[35px] h-[35px] rounded bg-orange-200" dangerouslySetInnerHTML={{ __html: avatar.toString() }}>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Navbar;
