"use client";
import { Box, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

import React from "react";
import MultiActionAreaCard from "./MultiActionAreaCard";
import RecipeReviewCard from "./RecipeReviewCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Welcome() {
  return (
    <Box paddingX={{ xs: 16, lg: 28 }} marginTop={12}>
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
        <Box width={"50%"}>
          <Typography variant="h3">
            “Unlocking Potential, One Step at a Time!”
          </Typography>
          <Typography variant="h5" marginTop={2}>
            Welcome to “Center for Autism Development (CAD)”
          </Typography>
          <Typography variant="body1" marginTop={2}>
            At CAD, our purpose is to empower individuals with neurodiversity
            and their families to live the most self-fulfilling and independent
            lives possible.
          </Typography>
          <Typography variant="body1" marginTop={2}>
            We are a learning center dedicated to developing the potential of
            children with autism, ADHD, or developmental delays through an early
            intensive language and behavioral intervention classroom. Our goal
            is to enhance language skills and stimulate all-around development
            using the principles of Applied Behavior Analysis (ABA) along with
            the Early Start Denver Model (ESDM)teaching approach. The program is
            taught in both English and Thai.
          </Typography>
        </Box>
        <Box width={"40%"}>
          <Paper elevation={1}>
            <Image
              src={"/statics/images/slide1/5.jpg"}
              width={700}
              height={100}
              alt="slide"
            />
          </Paper>
        </Box>
      </Stack>
      <Stack marginTop={8}>
        <Typography variant="h3" textAlign={"center"}>
          How We Help Your Child Thrive
        </Typography>
        <Stack
          direction={"row"}
          marginTop={4}
          justifyContent={"center"}
          columnGap={4}
        >
          <Box>
            <MultiActionAreaCard
              maxWidth={500}
              image={
                <Image
                  src={"/statics/images/slide1/5.jpg"}
                  width={800}
                  height={500}
                  alt=""
                />
              }
              title="Certified and designed ABA treatment specifically for children with special needs"
              body="Treatment based on Applied Behavior Analysis (ABA) focuses on understanding and modifying the behaviors of children with autism and other developmental delays. It aims to reinforce desirable behaviors and reduce inappropriate behaviors, while also helping children learn new skills and build social interactions. ABA treatment is internationally recognized as the most research-supported and evidence-based practice (EBP). It is not only suitable for children with autism but also for children with other developmental disorders, such as Attention-Deficit/Hyperactivity Disorder (ADHD), speech delays, global developmental delays, sensory processing disorder (SPD), and social, emotional, and behavioral challenges."
            />
          </Box>
          <Box>
            <MultiActionAreaCard
              maxWidth={500}
              image={
                <Image
                  src={"/statics/images/slide1/5.jpg"}
                  width={800}
                  height={500}
                  alt=""
                />
              }
              title="Certified and designed ABA treatment specifically for children with special needs"
              body="Treatment based on Applied Behavior Analysis (ABA) focuses on understanding and modifying the behaviors of children with autism and other developmental delays. It aims to reinforce desirable behaviors and reduce inappropriate behaviors, while also helping children learn new skills and build social interactions. ABA treatment is internationally recognized as the most research-supported and evidence-based practice (EBP). It is not only suitable for children with autism but also for children with other developmental disorders, such as Attention-Deficit/Hyperactivity Disorder (ADHD), speech delays, global developmental delays, sensory processing disorder (SPD), and social, emotional, and behavioral challenges."
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
