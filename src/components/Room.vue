<template>
  <div class="mt-3">
    <b-form-radio-group v-for="(item,index) in items"
                        :key="index"
                        @change="changed"
                        v-model="item.selected"
                        :state="!item.selected.value ? state : null">
      <label :class="visible ? null : 'collapsed mb-4'"
             :aria-expanded="visible ? 'true' : 'false'"
             aria-controls="collapse-4"
             @click="item.visible = !item.visible"
             class="pr-3">{{item.title}}</label>
      <b-collapse v-model="item.visible"
                  class="mb-3">
        <b-form-radio v-for="(list, key) in item.list"
                      :key="key"
                      :value="{type: item.type, value: list.value, id: list.key}"
                      inline
                      :name="list.value">
          {{list.value}}
        </b-form-radio>
      </b-collapse>
    </b-form-radio-group>
  </div>
</template>

<script>
import { BFormRadioGroup, BFormRadio, BCollapse } from 'bootstrap-vue'

export default {
  components: {
    BFormRadioGroup,
    BFormRadio,
    BCollapse
  },
  data() {
    return {
      items: [
        {
          title: "Oda Tipi",
          type: "room",
          selected: this.initialValue.roomType || "",
          visible: true,
          list: [
            {
              key: 1,
              value: "Standart"
            },
            {
              key: 2,
              value: "Deluxe"
            },
            {
              key: 3,
              value: "Suit"
            },
          ]
        },
        {
          title: "Manzara Seçimi",
          type: "landscape",
          selected: this.initialValue.landscapeChoice || "",
          visible: true,
          list: [
            {
              key: 4,
              value: "Deniz"
            },
            {
              key: 5,
              value: "Kara"
            }
          ]
        }
      ],
      visible: false
    }
  },
  props: {
    initialValue: {
      type: Object,
      required: false,
    },
    state: {
      type: Boolean,
      required: false,
      default: null
    }
  },
  methods: {
    changed(val) {
      this.$emit("changed", val)
    }
  },
}

</script>

<style lang="scss" scoped>
/deep/.custom-control {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #c2c2c2;
  width: 100%;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .custom-control-label {
    padding: 0;
    width: 100%;
    margin: 0 1rem;
    &,
    &:hover,
    &:active,
    &:focus {
      &:before {
        background: none;
        border-color: #a9a9a9;
      }
    }
  }
  .custom-control-input:checked,
  .custom-control-input:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  .custom-control-input:checked + label,
  .custom-control-input:not(:checked) + label {
    position: relative;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
  }
  .custom-control-input:checked + label:before {
    border-color: #8316b5 !important;
  }
  .custom-control-input:checked + label:before,
  .custom-control-input:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: auto;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #a9a9a9;
    border-radius: 100%;
    background: #fff;
  }
  .custom-control-input:checked + label:after,
  .custom-control-input:not(:checked) + label:after {
    content: "";
    width: 10px;
    height: 10px;
    background: #8316b5;
    position: absolute;
    top: 5px;
    left: auto;
    right: 5px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    background-image: none !important;
  }
  .custom-control-input:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  .custom-control-input:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
/deep/ .collapsed {
  width: 100%;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
}
</style>