<template>
  <div class="px-3">
    <Form
      ref="markForm"
      :model="formData"
      :rules="markFormValidation"
      label-position="right"
      :label-width="80"
    >
      <Row>
        <Col span="24">
          <FormItem
            prop="designation"
            label="Deseguinação"
            :error="showFormErrors('designation')"
          >
            <Input
              v-model="formData.designation"
              placeholder="Deseguinação do marco histórico"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem
            prop="content"
            label="Descrição do marco"
            :error="showFormErrors('content')"
          >
            <Input
              type="textarea"
              :rows="5"
              v-model="formData.content"
              placeholder="Introduza o conteúdo deste marco histórico"
            ></Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem
            prop="begin"
            label="Data de início"
            :error="showFormErrors('begin')"
          >
            <DatePicker
              class="w-full"
              :value="formData.begin"
              type="date"
              placeholder="Data inicio deste marco histórico"
              v-model="formData.begin"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="end"
            label="Fim de conclusão"
            :error="showFormErrors('end')"
          >
            <DatePicker
              class="w-full"
              :value="formData.end"
              type="date"
              placeholder="Data de conclução deste marco histórico"
              v-model="formData.end"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('markForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('marks/toggleCreateMarkDialog')
                    : handleModal('marks/toggleUpdateMarkDialog')
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
                        'markForm',
                        'marks',
                        'Marco regsitado',
                        'APP_UPDATE_MARKS_DATA',
                        'marks/toggleCreateMarkDialog'
                      )
                    : updateData(
                        'markForm',
                        'marks',
                        'Marco Atualizado',
                        'APP_UPDATE_MARKS_DATA',
                        'marks/toggleUpdateMarkDialog'
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
import { mark_validation } from "@/mixins/fieldsValidation";

export default {
  name: "MarkForm",
  mixins: [requests, mark_validation],
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
