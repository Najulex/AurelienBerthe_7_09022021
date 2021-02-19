<script>
export default {
	name: "posts",
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
	},
}
</script>

<template>
<div class="card text-center m-4">
  <div class="card-header">
    {{ title }}
  </div>
  <img class="card-img-top" alt="Image postée" :src="imageUrl">
  <div class="card-body">
    <p class="card-text h4">{{ text }}</p>
  </div>
  <div class="card-footer text-muted">
    posté par : {{ username }} le : {{ date }}
  </div>
</div>

</template>

