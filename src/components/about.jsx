
export const Countries = (props) => {

  return (
    <div id="about">
      <ul>
      {props.data.map((d, i) => (
      <li key={d.alpha2Code.toString()} className="now_country">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={d.picture} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <div className="country_title"><h2 className="country_name">{d.country}</h2><h3>Area: {d.region}</h3></div>
              <h3 className={d.safe_level.score < 4 ? d.safe_level.score < 3 ? "safe_level": "middle_level"   :"danger_level"}>Safe Level: {d.safe_level.score}/5</h3>
              <h3>{d.currency} is being {d.change_rate}% cheaper than usual</h3>
            </div>
          </div>
        </div>
      </div>
      </li>))} 
      </ul>      
    </div>
  );
};