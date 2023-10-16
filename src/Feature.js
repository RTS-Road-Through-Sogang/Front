import React from "react";
import styled from "styled-components";

const Feature = ({ image, description }) => {
  return (
    <FeatureContainer>
      <FeatureImage src={image} />
      <FeatureTitle>{description.title}</FeatureTitle>
      <FeatureDetail>{description.detail}</FeatureDetail>
    </FeatureContainer>
  );
};

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  margin: 50px auto;
  border: 1px solid grey;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 20px;
    justify-content: center;
  }
`;

const FeatureImage = styled.img`
  width: 60%;
  object-fit: cover;
  opacity: 0.8;
  margin-bottom: 5px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5em;
  margin: 10px 0;
`;

const FeatureDetail = styled.p`
  font-size: 1em;
  text-align: center;
  white-space: pre-line;
  line-height: 2;
`;
export default Feature;
