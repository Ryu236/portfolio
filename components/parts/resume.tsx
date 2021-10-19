import React from 'react'

export const Resume: React.VFC = () => {
  return (
    <article className="prose lg:prose-xl text-left">
      <div className="text-center">
        <h1>Resume</h1>
        <h2>Education</h2>
      </div>
      <div className="mx-4">
        <div>
          <p>Apr 2017 - Mar 2019 </p>
          <div className="ml-8">
            <h3>Shinshu University</h3>
            Graduate School of Science and Technology (Master&#39;s Program)
          </div>
        </div>
        <div>
          <p>Apr 2013 - Mar 2017 </p>
          <div className="ml-8">
            <h3>Shinshu University</h3>
            Faculty of Engineering Computer Science and Engineering
          </div>
        </div>
      </div>

      <h2 className="text-center">Career History</h2>
      <div className="mx-4">
        <div>
          <p>Apr 2019 - Now </p>
          <div className="ml-8">
            <h3>DMM.com</h3>
            Software Engineer
            <br />
            Development of the payment platform
          </div>
        </div>
        <div>
          <p>Sep 2018 - Sep 2018 </p>
          <div className="ml-8">
            <h3>Eureka</h3>
            Internship <br />
            Development of Android application
          </div>
        </div>
        <div>
          <p>Sep 2017 - Sep 2017 </p>
          <div className="ml-8">
            <h3>SONY</h3>
            Internship <br />
            Development of embedded system
          </div>
        </div>
      </div>
    </article>
  )
}
