export const Destinations = (props) => {
    const destination = props.inputData
    console.log(props.inputData)
    return(
        <div>
            <h2>{destination.country}</h2>
        </div>
    )
}