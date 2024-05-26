<template>
  <div class="form-control">
    <form @submit.prevent="save">
      <input class="input input-alt" type="text" required="" v-model="form.title" placeholder="Title">
      <span class="input-border input-border-alt"></span>
      <textarea class="input input-alt" v-model="form.content" required="" placeholder="Content"></textarea>
      <span class="input-border input-border-alt"></span>
      <br />
      <button class="button" type="submit">Save</button>
    </form>
    <button class="button" @click="load">Load</button>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}<br />
        {{ article.content }}<br />
        <button class="button" @click="edit(article)">Edit</button>
        <button class="button" @click="remove(article.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const form = reactive({
      title: '',
      content: ''
    });

    const articles = ref([]);

    async function load() {
      try {
        const response = await axios.get('http://localhost:3100/articles');
        articles.value = response.data;
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }

    async function save() {
      try {
        const response = await axios.post('http://localhost:3100/articles', form);
        articles.value.push(response.data);
        form.title = '';
        form.content = '';
      } catch (error) {
        console.error('Error saving article:', error);
      }
    }

    async function remove(id) {
      try {
        await axios.delete(`http://localhost:3100/articles/${id}`);
        articles.value = articles.value.filter(article => article.id !== id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }

    function edit(article) {
      form.title = article.title;
      form.content = article.content;
    }

    onMounted(load);

    return { form, articles, save, edit, remove, load };
  }
};
</script>


<style scoped>
ul {
  list-style-type:none; /* Menghilangkan bullet points */
  background-color: transparent;
  width: 50%;

}

li {
  margin-top: 3%;
  text-align: center;
  border-bottom: 1px solid #F1EEDC;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  color: white;
}
 

.input {
  color: black;
  font-size: 0.9rem;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 0.9em;
  padding-block: 0.7em;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 3%;
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.input:focus {
  outline: none;
}

.input:focus + .input-border {
  width: 100%;
}

.form-control {
  
  --width-of-input: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-alt {
  font-size: 1.2rem;
  padding-inline: 1em;
  padding-block: 0.8em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.input-border-alt {
  height: 3px;
  background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
  transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);
}

.input-alt:focus + .input-border-alt {
  width: 100%;
}

.button {
  display: inline-block;
  padding: 9px 18px;
  border: 1px solid #4f4f4f;
  border-radius: 4px;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  font-size: 10px;
  cursor: pointer;
  color: black;
  z-index: 1;
  margin-top: 3px;
  margin-left:2px;
  margin-right:2px;
  margin-bottom: 4px
}

.button:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #39bda7;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button:hover {
  color: #ffffff;
  border: 1px solid #39bda7;
}

.button:hover:before {
  top: -35%;
  background-color: #39bda7;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button:hover:after {
  top: -45%;
  background-color: #39bda7;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

</style>
