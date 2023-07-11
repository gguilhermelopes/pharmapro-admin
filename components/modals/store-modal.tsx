"use client";

import { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome da farmácia é obrigatório.",
  }),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error(
        "Algo deu errado. Por favor, tente novamente mais tarde ou verifique suas informações."
      );
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Criar nova farmácia"
      description="Adicione uma nova farmácia para gerenciar medicamentos e categorias."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Nova farmácia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button disabled={loading} type="submit">
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
