import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik '
import { useLocalStorage } from 'react-use'

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export const Card = ({ disabled, gameId, homeTeam, awayTeam, homeTeamScore, awayTeamScore, gameTime }) => {
  const [auth] = useLocalStorage('auth')

  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: 'post',
        baseURL: import.meta.env.VITE_API_URl,
        url: '/hunches',
        headers: {
          authorization: `Bearer ${auth.acessToken}`
        },
        data: {
          ...values,
          gameId
        }
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore
    },
    validationSchema
  })


  return (
    <div className="container max-w-3xl border border-gray-300 rounded-2xl text-center p-4">
      <span className="text-base  lg:text-xl text-gray-700 font-bold">{gameTime}</span>

      <form className="flex gap-6 justify-center items-center p-4">
        <span className="uppercase">{homeTeam}</span>
        <img src={`./imgs/lags/${homeTeam}.png`} />

        <input
          type="number"
          className="bg-red-300/[0.2] w-16 h-14 text-center tex-red-700 font-bold text-xl placeholder-red-700"
          name='homeTeamScore'
          value={formik.values.homeTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <span className="mx-4 text-red-500 font-bold text-xl">X</span>
        <input
          type="number"
          className="bg-red-300/[0.2] w-16 h-14 text-center tex-red-700 font-bold text-xl placeholder-red-700 "
          name='awayTeamScore'
          value={formik.values.awayTeamScore}
          onChange={formik.handleChange}
          onBlur={formik.handleSubmit}
          disabled={disabled}
        />

        <img src={`./imgs/lags/${awayTeam}.png`} />
        <span className="uppercase">{awayTeam}</span>
      </form>
    </div>
  )
}