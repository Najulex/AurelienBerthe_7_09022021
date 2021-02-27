<script>
export default {
	name: "posts",
  data() {
    return {
      url : window.location.pathname
    }
  },
  methods : {
    deletePost() {
      this.$emit('deleteUserPost')
    }
  },
	props: {
		title: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
    date: {
      type: String,
      required : true
    },
    imageUrl: {
      type: String
    }
	}
}
</script>

<template>

<div style="position:relative" class="card text-center m-4 shadow">
  <div v-if="title !== ''" class="card-header h5 p-4 background">
    {{ title }}
  </div>
  <img v-if="imageUrl !== 'NULL'" class="card-img-top" alt="Image postée" :src="imageUrl">
  <div class="card-body">
    <h3 class="card-text h4">{{ text }}</h3>
  </div>
  <div class="card-footer background">
    posté par : {{ username }}
  </div>
  <div>
    <button id="delete-btn" v-if="url == '/myaccount'" @click="deletePost" class="btn btn-outline-danger" title="Supprimer"><i class="far fa-trash-alt"></i></button>
  </div>
</div>

</template>

<style lang="scss">
.background {
  background-color: #f5fbff;
}
#delete-btn {
  width: 3.5rem;
  height: 3.5rem;
  position: absolute;
  top: .3rem;
  right: .3rem;
  font-size: 1.9rem;
}
</style>