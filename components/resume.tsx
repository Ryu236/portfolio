import React from 'react'

export const Resume: React.VFC = () => {
  return (
    <article className="prose prose-h3:mt-0 lg:prose-p:mt-16 prose-p:mt-10 lg:prose-xl text-left">
      <div className="text-center">
        <h1>Resume</h1>
      </div>
      <h2 className="text-center">Work Experience</h2>
      <div className="mx-4">
        <div>
          <p>May 2021 - Now </p>
          <div className="ml-8">
            <h3>GANGAN Inc.</h3>
            Software Engineer （side job）
            <br />
            Development of the application
          </div>
        </div>
        <div>
          <p>Apr 2019 - Now </p>
          <div className="ml-8">
            <h3>DMM.com LLC</h3>
            Software Engineer
            <br />
            Development, maintenance and operation of the payment platform
          </div>
        </div>
        <div>
          <p>Sep 2018 - Sep 2018 </p>
          <div className="ml-8">
            <h3>Eureka, Inc.</h3>
            Internship <br />
            Development of Android application
          </div>
        </div>
        <div>
          <p>Sep 2017 - Sep 2017 </p>
          <div className="ml-8">
            <h3>Sony Corporation</h3>
            Internship <br />
            Development of embedded system
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2>Education</h2>
      </div>
      <div className="mx-4">
        <div>
          <p>Apr 2017 - Mar 2019 </p>
          <div className="ml-8">
            <h3>Shinshu University</h3>
            Japan
            <br />
            Master of Science and Technology
          </div>
        </div>
        <div>
          <p>Apr 2013 - Mar 2017 </p>
          <div className="ml-8">
            <h3>Shinshu University</h3>
            Japan
            <br />
            Bachelor of Computer Science and Engineering
          </div>
        </div>
      </div>
    </article>
  )
}
