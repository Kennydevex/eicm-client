import { debounce } from "lodash";

export const handleFormData = {
  data() {
    return {
      sending: false
    };
  },

  methods: {
    removeFormData(index, obj) {
      obj.splice(index, 1);
    },

    addMultFormData(formRef, formDataObj, repeated, temp_data, clearTempData) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          if (repeated) {
            return;
          }
          this.formData[formDataObj].push(temp_data);
          clearTempData();
        } else {
          this.$Message.error("Erro da validação");
        }
      });
    },

    updateMultFormData(
      formRef,
      repeated,
      formDataObj,
      selectedData,
      tempData,
      clearFormData
    ) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          if (repeated) {
            return;
          }
          // this.formData.contacts[this.selected_contact] = this.temp_contacts;
          this.formData[formDataObj].splice(selectedData, 1, tempData);
          clearFormData();
          return true;
        } else {
          this.$Message.error("Erro de validação");
          return true;
        }
      });
    },

    cancelMultFormData(formDataObj, selectedData, clearFormData) {
      this.formData[formDataObj][selectedData] = this.formData[formDataObj][
        selectedData
      ];
      clearFormData();
      return true;
    },

    clearAllMultFormData(formDataObj, clearFormData) {
      if (this.formData[formDataObj].length) {
        this.deleteAlert(
          "Limpar dados",
          "Alguns dados inseridos queres ignorá-los"
        ).then(result => {
          if (result.value) {
            this.warningNotify(
              "Ignorar dados inseridos",
              "Registos ignorados, todos os dados foram ignorados"
            );
            this.formData[formDataObj] = [];
            clearFormData();
          }
        });
        return;
      }
    },

   

    repeatedFormData: debounce(function(
      formDataObj,
      objField,
      field,
      selectData
    ) {
      for (var i = 0; i < this.formData[formDataObj].length; i++) {
        if (
          this.formData[formDataObj][i][objField] == field &&
          i !== selectData
        ) {
          return true;
        }
      }
      return false;
    },
    500)
  }
};
