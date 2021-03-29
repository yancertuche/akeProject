import Card from './Card';
import MoviesFetch from './MoviesFetch';
import Vector from './Icons/Vector.png';
import FilterIcon from './Icons/FilterIcon.png';
import ArrowIcon from './Icons/ArrowIcon.png';
import '../Styles/MoviesPageStyle.css'

function MoviesPage () {
    const server = "http://localhost:3525";
    const link = "https://image.tmdb.org/t/p/w500";
    const token = "123456789";
    const endPoint = "/movies/" + token;
    const [respuesta, cargando, hasError, generos] = MoviesFetch(server+endPoint)

    function mapGenres(arr){
        console.log("vine a fucioón")
        var genreNames = []
        var r = ""
        for(var j=0 ; j<arr.length; j++){
            for(var i in generos){
                if(arr[j] === generos[i].id){
                    genreNames.push(generos[i].name)
                }
            }
        }
        r = genreNames.join(', ')
        console.log("retorno función", r)
        return r
    }

    return(
        <div>
            <div><h4>Películas</h4></div>
            <div className="toolsContainer">
                <input className="input" type="text"></input>
                <img src={Vector} alt="icon"></img>
                <div className="vertical"></div>
                <img src={FilterIcon} alt="icon"></img>
                <div className="vertical"></div>
                <label>Ordenar </label>
                <img src={ArrowIcon} alt="icon"></img> 
            </div>

            <div>
            {cargando? 
                <div> Cargando ... </div>: 
                (hasError? <div> Se produjo un error. </div>:
                (respuesta.map (data => <Card Title={data.title}
                Year={data.release_date.slice(0,4)}
                ImgPath={link + data.poster_path}
                Description={data.overview}
                Vote={data.vote_average}
                Genre={mapGenres(data.genre_ids)}
                Date={data.release_date}
                />)))} 
            </div>
        </div>
    )
};
export default MoviesPage;