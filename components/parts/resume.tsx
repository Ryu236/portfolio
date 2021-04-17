import React from 'react'

export const Resume: React.VFC<{}> = () => {
  return (
    <article className="prose lg:prose-xl text-center">
      <h2>Resume</h2>
      <h3>Education</h3>
      <div>
        <p>Apr 2017 - Mar 2019 </p>
        Shinshu University Graduate School of Science and Technology
        (Master&#39;s Program)
      </div>
      <div>
        <p>Apr 2013 - Mar 2017 </p>
        Shinshu University Faculty of Engineering Computer Science and
        Engineering
      </div>
      <h3>Career History</h3>
      <div>
        <p>Apr 2019 - Now </p>
        DMM.com Software Engineer
        <br />
        Development payment platform
      </div>
      <div>
        <p>Sep 2018 - Sep 2018 </p>
        Eureka Internship
        <br />
        Development Android application
      </div>
      <div>
        <p>Sep 2017 - Sep 2017 </p>
        SONY Internship
        <br />
        Development embedded system
      </div>
    </article>
  )
}
