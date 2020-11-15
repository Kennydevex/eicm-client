<template>
  <div class="px-3">
    <Form
      ref="muralForm"
      :model="formData"
      :rules="muralFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem prop="designation" label="Deseguinação" :error="showFormErrors('designation')">
        <Input v-model="formData.designation" placeholder="Deseguinação do mural"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição do mural"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Descrição do mural"
        ></Input>
      </FormItem>

      <FormItem prop="icon" label="Icone">
        <RadioGroup type="button" v-model="formData.icon">
          <Radio label="1">Direção</Radio>
          <Radio label="2">Secretaria</Radio>
          <Radio label="3">Biblioteca</Radio>
          <Radio label="4">Geral</Radio>
        </RadioGroup>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('muralForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('murals/toggleCreateMuralDialog')
                    : handleModal('murals/toggleUpdateMuralDialog')
                "
                >Cancelar</Button
              >

              <Button
                :loading="sending"
                type="primary"
                style="margin-left: 8px"
                @click.stop="
                  creating
                    ? addData(
                        'muralForm',
                        'murals',
                        'Mural regsitado',
                        'APP_UPDATE_MURALS_DATA',
                        'murals/toggleCreateMuralDialog'
                      )
                    : updateData(
                        'muralForm',
                        'murals',
                        'Mural Atualizado',
                        'APP_UPDATE_MURALS_DATA',
                        'murals/toggleUpdateMuralDialog'
                      )
                "
                ><span v-if="!sending">{{
                  creating ? "Registar" : "Atualizar"
                }}</span>
                <span v-else>Enviando...</span></Button
              >
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { mural_validation } from "@/mixins/fieldsValidation";

export default {
  name: "MuralForm",
  mixins: [requests, mural_validation],
  props: {
    creating: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="css"></style>
