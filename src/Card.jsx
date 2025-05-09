import ProfileImage from './assets/Profilepic.jpg'

function Card(){
    return(
        <div className="card">
            <img alt="Profile Picture" src={ProfileImage} className='card-image'></img>
            <h2 className='card-title'>
                Well This is a Code
            </h2>
            <p className='card-text'>
                I am studing this shit of react
            </p>
        </div>
    )

}

export default Card