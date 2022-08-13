// export const About = (props) => {
  

//   return (
//           <div className="col-xs-12 col-md-6">
//             {" "}
//             <img src={props.picture} className="img-responsive" alt="" />{" "}
//           </div>
//     <div id="about">
//       {props.map((d, i) => (
//       <div className="container">
//         <div className="row">
//           <div className="col-xs-12 col-md-6">
//             {" "}
//             <img src={props.picture} className="img-responsive" alt="" />{" "}
//           </div>
//           <div className="col-xs-12 col-md-6">
//             <div className="about-text">
//               <h2>{props.country}</h2>
//               <p>{props ? props.advisory.message : "loading..."}</p>
//               <h3>Why Choose Us?</h3>
//               <div className="list-style">
//                 <div className="col-lg-6 col-sm-6 col-xs-12">
//                   <ul>
//                     {props.data
//                       ? props.data.Why.map((d, i) => (
//                           <li key={`${d}-${i}`}>{d}</li>
//                         ))
//                       : "loading"}
//                   </ul>
//                 </div>
//                 <div className="col-lg-6 col-sm-6 col-xs-12">
//                   <ul>
//                     {props.data
//                       ? props.data.Why2.map((d, i) => (
//                           <li key={`${d}-${i}`}> {d}</li>
//                         ))
//                       : "loading"}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       ))} 
//     </div>
//   );
// };

export const About = (props) => {
  console.log(props.data)
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
              <h2>{d.country}</h2>
              <p>{d ? d.country : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              {/* <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      </li>))} 
      </ul>      
    </div>
  );
};