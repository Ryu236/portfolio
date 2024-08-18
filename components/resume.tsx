import React from 'react'

export const Resume: React.FC = () => {
  return (
    <article className="prose prose-h3:mt-0 lg:prose-p:mt-16 prose-p:mt-10 lg:prose-xl text-left mt-24 dark:text-white">
      <h1 className="text-center dark:text-white">Resume</h1>
      <h2 className="text-center dark:text-white">Experience</h2>
      <div className="mx-4">
        <div>
          <p>Mar 2023 - Present</p>
          <div className="ml-8">
            <h3 className="dark:text-white">UPSIDER, Inc.</h3>
            Backend Engineer <br />
            Development of the web application, payment card processing system
            and fraudulent use prevention
          </div>
        </div>
        <div>
          <p>Apr 2023 - Jan 2024</p>
          <div className="ml-8">
            <h3 className="dark:text-white">Shiftbase, Inc.</h3>
            Backend Engineer（side job） <br />
            Development of the web application
          </div>
        </div>
        <div>
          <p>Apr 2019 - Feb 2023</p>
          <div className="ml-8">
            <h3 className="dark:text-white">DMM.com LLC</h3>
            Software Engineer <br />
            Development, maintenance and operation of the payment platform
          </div>
        </div>
        <div>
          <p>May 2021 - Jan 2022</p>
          <div className="ml-8">
            <h3 className="dark:text-white">GANGAN, Inc.</h3>
            Backend Engineer（side job） <br />
            Development of the application
          </div>
        </div>
        <div>
          <p>Sep 2018 - Sep 2018 </p>
          <div className="ml-8">
            <h3 className="dark:text-white">Eureka, Inc.</h3>
            Internship <br />
            Development of Android application
          </div>
        </div>
        <div>
          <p>Sep 2017 - Sep 2017 </p>
          <div className="ml-8">
            <h3 className="dark:text-white">Sony Corporation</h3>
            Internship <br />
            Development of embedded system
          </div>
        </div>
      </div>

      <h2 className="text-center mt-20 dark:text-white">Education</h2>
      <div className="mx-4">
        <div>
          <p>Apr 2017 - Mar 2019 </p>
          <div className="ml-8">
            <h3 className="dark:text-white">Shinshu University</h3>
            Japan <br />
            Master of Science and Technology <br />
            Electrical and Computer Engineering Division
          </div>
        </div>
        <div>
          <p>Apr 2013 - Mar 2017 </p>
          <div className="ml-8">
            <h3 className="dark:text-white">Shinshu University</h3>
            Japan <br />
            Bachelor of Computer Science and Engineering
          </div>
        </div>
      </div>
    </article>
  )
}
