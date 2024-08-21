import { useAuth } from '@/hooks/auth'
import { BtnDanger } from '@/components/default/buttons'

const Navigation:React.FC<any> = ({ user }) => {
    const { logout } = useAuth()

    return (
        <nav className="bg-white border-b border-gray-100 py-4">
            <ul className='flex w-full justify-between px-10'>
                <li className='flex gap-2'>
                    <p>نام کاربر:</p>
                    <p>{user.name}</p>
                </li>
                <li>
                    <BtnDanger onClick={logout}>
                        خروج از حساب
                    </BtnDanger>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation