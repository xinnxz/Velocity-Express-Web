
import { useState } from 'react'
import LoginForm from '@/components/login/LoginForm'
import LoginOTPForm from '@/components/login/LoginOTPForm'

export default function LoginContainer() {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password')

return (
    <div className="w-full max-w-md" id="in07l" style={{ margin: '50px 0px 50px 0px' }}>
      {loginMethod === 'password' ? (
        <LoginForm onSwitchToOTP={() => setLoginMethod('otp')} />
      ) : (
        <LoginOTPForm onSwitchToPassword={() => setLoginMethod('password')} />
      )}
    </div>
  )
}
