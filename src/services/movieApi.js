// Versión refactorizada usando la API nativa fetch() para la rama "fetch"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '38c3aa89'
const BASE_URL = 'https://www.omdbapi.com/'

const mockMovies = [
  {
    Title: "The Dark Knight",
    Year: "2008",
    imdbID: "tt0468569",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Runtime: "152 min",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Language: "English, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Won 2 Oscars. 163 wins & 163 nominations total",
    imdbRating: "9.0",
    imdbVotes: "2,900,000"
  },
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    Runtime: "148 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    Language: "English, Japanese, French",
    Country: "United States, United Kingdom",
    Awards: "Won 4 Oscars. 159 wins & 220 nominations total",
    imdbRating: "8.8",
    imdbVotes: "2,500,000"
  },
  {
    Title: "Batman Begins",
    Year: "2005",
    imdbID: "tt0372784",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BOT0fedNmZGEtMmVkMC00MDk4LTgwMzYtN2U3Yzk2MGVjYWJjXkEyXkFqcGc@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "15 Jun 2005",
    Runtime: "140 min",
    Genre: "Action, Crime, Drama",
    Director: "Christopher Nolan",
    Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
    Actors: "Christian Bale, Michael Caine, Liam Neeson",
    Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
    Language: "English, Urdu, Mandarin",
    Country: "United States, United Kingdom",
    Awards: "Nominated for 1 Oscar. 14 wins & 79 nominations total",
    imdbRating: "8.2",
    imdbVotes: "1,600,000"
  },
  {
    Title: "The Batman",
    Year: "2022",
    imdbID: "tt1877830",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGc@._V1_SX300.jpg",
    Rated: "PG-13",
    Released: "04 Mar 2022",
    Runtime: "176 min",
    Genre: "Action, Crime, Drama",
    Director: "Matt Reeves",
    Writer: "Matt Reeves, Peter Craig, Bob Kane",
    Actors: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
    Plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    Language: "English, Spanish",
    Country: "United States",
    Awards: "Nominated for 3 Oscars. 35 wins & 166 nominations total",
    imdbRating: "7.8",
    imdbVotes: "750,000"
  },
  {
    Title: "Batman: The Animated Series",
    Year: "1992–1995",
    imdbID: "tt0103359",
    Type: "series",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzA5MjkwYzItZDE1MC00MDliLTlkNWUtYjE2ZDFmNWU4NDlhXkEyXkFqcGc@._V1_SX300.jpg",
    Rated: "TV-PG",
    Released: "05 Sep 1992",
    Runtime: "23 min",
    Genre: "Animation, Action, Adventure",
    Director: "N/A",
    Writer: "Bob Kane, Eric Radomski, Bruce Timm",
    Actors: "Kevin Conroy, Loren Lester, Efrem Zimbalist Jr.",
    Plot: "The Dark Knight fights crime in Gotham City with occasional help from Robin and Batgirl.",
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Primetime Emmy. 6 wins & 20 nominations total",
    imdbRating: "9.0",
    imdbVotes: "115,000"
  }
]

export async function searchMovies({ query, type = '', year = '' }) {
  if (!query || query.trim().length < 2) {
    throw new Error('El término de búsqueda debe tener al menos 2 caracteres.')
  }

  try {
    const url = new URL(BASE_URL)
    url.searchParams.append('apikey', API_KEY)
    url.searchParams.append('s', query.trim())

    if (type) url.searchParams.append('type', type)
    if (year) url.searchParams.append('y', year)

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === 'True') {
      return {
        Search: data.Search,
        totalResults: data.totalResults
      }
    } else {
      const lowerQuery = query.toLowerCase()
      const filteredMock = mockMovies.filter(m => {
        const matchesTitle = m.Title.toLowerCase().includes(lowerQuery)
        const matchesType = !type || m.Type === type
        const matchesYear = !year || m.Year.includes(year)
        return matchesTitle && matchesType && matchesYear
      })

      if (filteredMock.length > 0) {
        return {
          Search: filteredMock,
          totalResults: String(filteredMock.length)
        }
      }

      throw new Error(data.Error || 'No se encontraron resultados para tu búsqueda.')
    }
  } catch (error) {
    const lowerQuery = query.toLowerCase()
    const filteredMock = mockMovies.filter(m => m.Title.toLowerCase().includes(lowerQuery))
    if (filteredMock.length > 0) {
      return {
        Search: filteredMock,
        totalResults: String(filteredMock.length)
      }
    }

    throw new Error(error.message || 'Ocurrió un error al realizar la búsqueda con fetch.')
  }
}

export async function getMovieDetails(imdbId) {
  if (!imdbId) {
    throw new Error('ID de película no proporcionado.')
  }

  try {
    const url = new URL(BASE_URL)
    url.searchParams.append('apikey', API_KEY)
    url.searchParams.append('i', imdbId)
    url.searchParams.append('plot', 'full')

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === 'True') {
      return data
    } else {
      const foundMock = mockMovies.find(m => m.imdbID === imdbId)
      if (foundMock) return foundMock
      throw new Error(data.Error || 'No se pudieron obtener los detalles con fetch.')
    }
  } catch (error) {
    const foundMock = mockMovies.find(m => m.imdbID === imdbId)
    if (foundMock) return foundMock

    throw new Error(error.message || 'Error al obtener los detalles de la película con fetch.')
  }
}
