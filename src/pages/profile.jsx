import { useState, useEffect } from 'react'
import { useLocalStorage, useAsyncFn } from 'react-use'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { format, formatISO } from 'date-fns'

import { Icon, Card, DateSelect } from "~/assets/components"

export const Profile = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)))
  const [auth, setAuth] = useLocalStorage('auth', {})
  const logout = () => {
    setAuth({})
    navigate('/login')
  }

  const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${params.username}`
    })

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch
      return acc
    }, {})

    return {
      ...res.data,
      hunches
    }
  })

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: 'get',
      baseURL: import.meta.env.VITE_API_URL,
      url: '/games',
      params
    })

    return res.data
  })

  const isLoading = games.loading || loading
  const hasError = games.error || error
  const isDone = !isLoading || !hasError


  useEffect(() => {
    fetchGames({ gameTime: currentDate })
  }, [currentDate])

  useEffect(() => {
    fetchHunches()
  }, [])

  return (
    <>

      <header className="bg-red-500 h-20 flex ">
        <div className="container max-w-3xl flex items-center justify-between">
          <Icon className="h-12 w-max" name="logo" />
          {auth?.user?.id && (
            <div onClick={(logout)} className='text-white -bold p-2 cursor-pointer'>
              Sair
            </div>
          )}
        </div>
      </header>

      <main className="space-y-6">
        <section className=" bg-red-500 h-40 text-white">
          <div className="pt-6 container max-w-3xl space-y-6 ">
            <a href="/dashboard">
              <Icon name="arrows" className="h-8 text-white" />
            </a>
            <h3 className="text-2xl font-bold ">{user?.name}</h3>
          </div>
        </section>

        <section id="content">
          <div className="container max-w-3xl my-12">
            <h2 className="text-2xl font-bold text-red-500">Seus Palpites</h2>
          </div>

          <div className="flex gap-8 justify-center h-20 items-center m-5 ">
            <DateSelect currentDate={currentDate} onChange={setDate} />

          </div>

          <div className="space-y-4">
            {isLoading && 'Carregando jogos...'}
            {hasError && 'Ops! algo deu errado...'}

            {isDone && games.value?.map(game => (
              <Card
                key={game.id}
                gameId={game.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                gameTime={format(new Date(game.gameTime), 'H:mm')}
                homeTeamScore={user?.hunches?.[game.id]?.homeTeamScore || ''}
                awayTeamScore={user?.hunches?.[game.id]?.awayTeamScore || ''}
                disabled={true}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}