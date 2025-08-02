import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

export default function Navbar() {
  const user = useSelector((s: RootState) => s.auth.user)

    return (
        <nav style={{ padding: '12px 16px', borderBottom: '1px solid #ddd' }}>
            <strong>Star Wars Movies</strong>
            <span style={{ float: 'right' }}>
                {user ? <>Logged in as <b>{user.username}</b></> : 'Not logged in'}
            </span>
        </nav>
    );
}
