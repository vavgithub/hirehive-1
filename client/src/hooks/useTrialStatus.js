import { useAuthContext } from '../context/AuthProvider'
import { getTrialStatus } from '../utility/trial.utils'

const useTrialStatus = () => {
  const { user } = useAuthContext()

  return getTrialStatus(user)
}

export default useTrialStatus
