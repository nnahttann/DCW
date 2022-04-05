import { useRouter } from 'next/router'
import { useEffect } from 'react'

const studentdAuth = WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (token)
                router.push('/students_edit')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default studentdAuth