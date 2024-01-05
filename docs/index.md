---
layout: home

hero:
  name: Simplemw's blog
  # text: Knowledge platform...
  tagline: Buiding...
  image:
    src: ./images/romantic.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/java/
    # - theme: alt
    #   text: View on GitHub
    #   link: https://github.com/vuejs/vitepress

      
# features:
#   - icon: 🛠️
#     title: Simple and minimal, always
#     details: Lorem ipsum...
#   - icon:
#       src: /cool-feature-icon.svg
#     title: Another cool feature
#     details: Lorem ipsum...
#   - icon:
#       dark: /dark-feature-icon.svg
#       light: /light-feature-icon.svg
#     title: Another cool feature
#     details: Lorem ipsum...


---

<style>
    /* 主页自定义颜色 */
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    }
    .container {
      display: flex;
      flex-direction: row;
    }

    .main {
      order: 1;
    }

    .image {
        order: 2;
    }
</style>


<div>
  <div class="typewriter">
    {{ displayedSentence }}
    <span class="cursor"></span>
  </div>
    <div class = "peoplelock">
       <iframe src="https://renwai.ren/cdn/html/shizhong/" scrolling="no" frameborder="0" width="170px" height="60px"></iframe>
    </div>
</div>

<script>
export default {
  data() {
    return {
      sentences: [
        "To see the world,", 
        "things dangerous to come to,", 
        "to see behind walls,to draw closer,",
        "things dangerous to come to,", 
        "to find each other and to feel,",
        "that is the purpose of life."
      ],
      currentSentenceIndex: 0,
      currentCount: 0,
      isDeleting: false,
      typingSpeed: 100, // 打字速度，单位为毫秒
      deletingSpeed: 35 // 删除速度，单位为毫秒
    };
  },
  mounted() {
    this.type();
  },
  methods: {
    type() {
      const currentSentence = this.sentences[this.currentSentenceIndex];
      if (this.isDeleting) {
        if (this.currentCount > 0) {
          this.currentCount--;
          setTimeout(this.type, this.deletingSpeed);
        } else {
          this.isDeleting = false;
          this.currentSentenceIndex++;
          if (this.currentSentenceIndex >= this.sentences.length) {
            this.currentSentenceIndex = 0;
          }
          setTimeout(this.type, this.typingSpeed);
        }
      } else {
        if (this.currentCount < currentSentence.length) {
          this.currentCount++;
          setTimeout(this.type, this.typingSpeed);
        } else {
          this.isDeleting = true;
          setTimeout(this.type, this.typingSpeed);
        }
      }
    }
  },
  computed: {
    displayedSentence() {
      const currentSentence = this.sentences[this.currentSentenceIndex];
      if (this.isDeleting) {
        return currentSentence.slice(0, this.currentCount);
      } else {
        return currentSentence.slice(0, this.currentCount + 1);
      }
    }
  }
};
</script>


<style>
.typewriter {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 24px;
}

.cursor {
  display: inline-block;
  vertical-align: middle;
  width: 2px;
  height: 24px;
  background-color: black;
  animation: blink 0.8s infinite;
}

.peoplelock {
    position: fixed;
    top: 0px;
    width: 160px;
    height: 70px;
    text-align:center;
    left: 45%;
    top: 0%;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>




