<template>
  <div>
    <div
      :class="activeShadeClasses(title, 'desktop')"
      @click="$emit('click:shadeChange', title)"
    >
      <div class="shadewrap">
        <SfImage
          :src="imagesrc"
          alt="Vila stripe maxi shirt dress"
          :width="25"
          :height="19"
        />
      </div>
      <div class="shadetitle">
        <SfHeading
          :level="5"
          :title="title"
          class="filters__title sf-heading--left"
        />
      </div>
    </div>
    <div :class="activeShadeClasses(title, 'smartphone')"  @click="$emit('click:shadeChange', title)">
      <div
        class="circleImage"
        :style="{ backgroundImage: `url(${imagesrc})` }"
      ></div>
    </div>
  </div>
</template>

<script>
import { SfHeading, SfImage, SfLink } from "@storefront-ui/vue";
export default {
  name: "ShadeWrap",
  components: {
    SfHeading,
    SfImage,
    SfLink,
  },
  props: ["title", "imagesrc", "selectedShade"],
  setup(props, context) {
    console.log("props", props);
    const addCounter = () => {
      context.root.$store.commit("increment", 20);
    };
    const onAddToCart = (title) => {
      console.log("test...............");
      $emit("click:shadeChange", title);
    };
    const activeShadeClasses = (title, display) => {
      console.log("title>>>>>>>>>", title, props.selectedShade);
        let defaultClass = display==='desktop'?"shadeDet desktop-only":"smartphone-only circleShade";
        if (title === props.selectedShade) {
          return `${defaultClass} ${"shadeActive"}`;
        } else {
          return `${defaultClass} ${"shadeInactive"}`;
        }
    };
    return {
      addCounter,
      onAddToCart,
      activeShadeClasses,
    };
  },
};
</script>
<style lang="scss">
.shadewrap {
  float: left;
  width: 30px;
  margin-top: 3px;
}
.shadetitle {
  float: left;
  width: 100px;
}
.shadeDet {
  cursor: pointer;
  width: 130px;

  padding: 4px;
  float: left;
  margin-right: 5px;
  height: 25px;
  border-radius: 6px;
  // width:100px;
  //   border: 1px solid green;
  //   padding: 20px;
}
.shadeActive {
  border: 1px solid var(--c-primary);
}
.shadeInactive {
  border: 1px solid silver;
}
.circleShade {
  width: 55px;
  height: 55px;
  border-radius: 50px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
}
.circleImage {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-top: 6px;
  margin-left: 6px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 150%;
  background-position: 50% 50%;
  border: 1px solid silver;
}
</style>