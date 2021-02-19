<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Adrian Mendez</title>

    <!-- https://spreadsheets.google.com/feeds/list/1uX9LdKDyy8BIS8HXQAoLBCbUqhaZgM5nNaFaelV8A0o/1/public/full?alt=json -->

    <!-- ***************************JQUERY*************************************** -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>

    <!-- *****************************BOOTSTRAP 5********************************** -->
    <!-- ************BOOTSTRAP 5 DOCS -> https://v5.getbootstrap.com/************** -->
    <!-- <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossorigin="anonymous"
    ></script> -->
    <!-- ***************************SHOELACE********************************** -->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.23/dist/shoelace/shoelace.css">
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.23/dist/shoelace/shoelace.esm.js"></script> -->

    <!-- ************************YOUR CODE**************************************** -->
    <script src="./js/components.js" defer></script>
    <script src="./js/app.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <header>
      <nav>
        <div id="logo">
          <div class="logo">
            <a class="logo-content" href="#landing-page">
              <div>
                AM
              </div>
              <span class="subtext">Software Engineer</span>
            </a>
          </div>
        </div>
        <div id="nav-icon">
          <div class="menu-background top-bottom"></div>
          <div class="menu-background middle"></div>
          <div class="menu-background top-bottom"></div>
        </div>
      </nav>
    </header>
    <main>
      <div>
        <ul id="menu">
          <li><a href="#primary-bg">Statement</a></li> 
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <!-- <li><a href="#about">About</a></li> -->
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div id="landing-page">
        <div class="logo">
          <div class="logo-content">
            <div>
              <span>Adrian</span>
              <span>Mendez</span>
            </div>
            <span class="subtext">Software Engineer</span>
          </div>
        </div>
      </div>
      <div id="primary-bg">
        <section class="content-format" >
          <div class="content-header">
            <h3 id="statement">Statement</h3>
            <div class="underline">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p>
            Software Engineer who enjoys solving complex problems with effective solutions. 
            Determined to write clean, precise code, and design efficient applications. Inspired by an ancestry of craftsmen 
            to build expressive and intuitive products in the digital space. 
          </p>
        </section>
        <section class="content-format" >
          <div class="content-header">
            <h3 id="skills">Skills</h3>
            <div class="underline">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="lists-container">
            <div class="list">
              <h2>Front End</h2>
              <ul>
                <li><i class="fab fa-html5"></i>HTML5</li>
                <li><i class="fab fa-css3-alt"></i>CSS3</li>
                <li><i class="fab fa-sass"></i>SASS</li>
                <li><i class="fab fa-js-square"></i>JavaScript</li>
                <li><i class="fab fa-js-square"></i>jQuery</li>
                <li><i class="fab fa-react"></i>React</li>
                <li><i class="far fa-gem"></i>Ruby</li>
                <li><i class="far fa-gem"></i>Rails</li>
              </ul>
            </div>
            <div class="list">
              <h2>Back End</h2>
              <ul>
                <li><i class="fab fa-node"></i>Node.JS</li>
                <li><i class="fab fa-node-js"></i>Express.JS</li>
                <li><i class="fas fa-database"></i>MongoDB</li>
                <li><i class="fab fa-python"></i>Python</li>
                <li><i class="fas fa-database"></i>PostgresQL</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div id="secondary-bg">
        <section class="content-format" >
          <div class="content-header">
            <h3 id="projects">Projects</h3>
            <div class="underline">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="projects-nav">
            <ul class="proj-nav">
              <li id="all">All</li>
              <li id="js">Javascript</li>
              <li id="react">React</li>
              <li id="ruby">Ruby/Rails</li>
              <div class="nav-underline">
                <hr id="_all">
              </div>
            </ul>
          </div>
          <ul class="projects-container">
          </ul>
        </section>
        <!-- <section class="content-format">
          <div class="content-header" >
            <h3 id="about">About</h3>
            <div class="underline">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ducimus, esse, fugiat autem accusamus 
            magnam expedita reiciendis, vel amet sint numquam fugit alias quod? Velit adipisci, sequi consequatur 
            perspiciatis ea doloremque reiciendis laudantium neque, qui recusandae asperiores esse eveniet cupiditate
            exercitationem, libero ducimus facere officia aperiam placeat commodi quibusdam suscipit?
          </p>
        </section> -->
        <section class="content-format" >
          <div class="content-header">
            <h3 id="contact">Contact</h3>
            <div class="underline">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="form-container">
            <form action="contactform.php" method="post">
              <input type="text" name="name" id="name" placeholder="Name">
              <input type="email" name="mail" id="mail" placeholder="Email">
              <textarea name="message" id="message" cols="30" rows="10" placeholder="Leave your message here"></textarea>
              <div><button name="submit" type="submit" class="button submit">Send</button></div>
            </form>
          </div>
        </section>
      </div>
    </main>
    <footer>
      <p>&#169 Adrian Mendez 2020</p>
      <ul>
        <li><a href="https://github.com/adrianmendez03" target="_blank"><i class="fab fa-github fa-lg"></i></a></li>
        <li><a href="https://www.linkedin.com/in/adrianmendez03/" target="_blank"><i class="fab fa-linkedin-in fa-lg"></i></a></li>
      </ul>
    </footer>
  </body>
</html>
