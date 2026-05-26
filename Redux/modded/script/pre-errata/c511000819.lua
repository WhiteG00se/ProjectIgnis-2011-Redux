--Chaos Emperor Dragon - Envoy of the End (Redux-11 errata)
local s,id=GetID()
function s.initial_effect(c)
	c:EnableReviveLimit()
	--Special Summon by banishing 2 LIGHT and 2 DARK monsters from your GY
	local e1=Effect.CreateEffect(c)
	e1:SetDescription(aux.Stringid(id,0))
	e1:SetType(EFFECT_TYPE_FIELD)
	e1:SetCode(EFFECT_SPSUMMON_PROC)
	e1:SetProperty(EFFECT_FLAG_UNCOPYABLE)
	e1:SetRange(LOCATION_HAND)
	e1:SetCondition(s.spcon)
	e1:SetTarget(s.sptg)
	e1:SetOperation(s.spop)
	c:RegisterEffect(e1)
	--Destroy all other cards on the field when Special Summoned
	local e2=Effect.CreateEffect(c)
	e2:SetDescription(aux.Stringid(id,1))
	e2:SetCategory(CATEGORY_DESTROY+CATEGORY_RECOVER)
	e2:SetType(EFFECT_TYPE_SINGLE+EFFECT_TYPE_TRIGGER_O)
	e2:SetCode(EVENT_SPSUMMON_SUCCESS)
	e2:SetCost(s.descost)
	e2:SetTarget(s.destg)
	e2:SetOperation(s.desop)
	c:RegisterEffect(e2)
end
function s.spfilter(c,att)
	return c:IsAttribute(att) and c:IsAbleToRemoveAsCost() and aux.SpElimFilter(c,true)
end
function s.rescon(sg)
	return sg:FilterCount(Card.IsAttribute,nil,ATTRIBUTE_LIGHT)==2
		and sg:FilterCount(Card.IsAttribute,nil,ATTRIBUTE_DARK)==2
end
function s.spcon(e,c)
	if c==nil then return true end
	local tp=c:GetControler()
	local rg=Duel.GetMatchingGroup(s.spfilter,tp,LOCATION_GRAVE,0,nil,ATTRIBUTE_LIGHT+ATTRIBUTE_DARK)
	local lg=rg:Filter(Card.IsAttribute,nil,ATTRIBUTE_LIGHT)
	local dg=rg:Filter(Card.IsAttribute,nil,ATTRIBUTE_DARK)
	return Duel.GetLocationCount(tp,LOCATION_MZONE)>0 and #lg>=2 and #dg>=2
		and aux.SelectUnselectGroup(rg,e,tp,4,4,s.rescon,0)
end
function s.sptg(e,tp,eg,ep,ev,re,r,rp,c)
	local rg=Duel.GetMatchingGroup(s.spfilter,tp,LOCATION_GRAVE,0,nil,ATTRIBUTE_LIGHT+ATTRIBUTE_DARK)
	local g=aux.SelectUnselectGroup(rg,e,tp,4,4,s.rescon,1,tp,HINTMSG_REMOVE,nil,nil,true)
	if #g>0 then
		g:KeepAlive()
		e:SetLabelObject(g)
		return true
	end
	return false
end
function s.spop(e,tp,eg,ep,ev,re,r,rp,c)
	local g=e:GetLabelObject()
	if not g then return end
	Duel.Remove(g,POS_FACEUP,REASON_COST)
	g:DeleteGroup()
end
function s.descost(e,tp,eg,ep,ev,re,r,rp,chk)
	if chk==0 then return true end
	Duel.PayLPCost(tp,math.floor(Duel.GetLP(tp)/2))
end
function s.destg(e,tp,eg,ep,ev,re,r,rp,chk)
	if chk==0 then return true end
	local g=Duel.GetFieldGroup(tp,LOCATION_ONFIELD,LOCATION_ONFIELD)
	g:RemoveCard(e:GetHandler())
	Duel.SetOperationInfo(0,CATEGORY_DESTROY,g,#g,PLAYER_ALL,LOCATION_ONFIELD)
	Duel.SetOperationInfo(0,CATEGORY_RECOVER,nil,0,PLAYER_ALL,#g*600)
end
function s.desop(e,tp,eg,ep,ev,re,r,rp)
	local g=Duel.GetFieldGroup(tp,LOCATION_ONFIELD,LOCATION_ONFIELD)
	g:RemoveCard(e:GetHandler())
	local ct=Duel.Destroy(g,REASON_EFFECT)
	if ct>0 then
		Duel.BreakEffect()
		Duel.Recover(tp,ct*600,REASON_EFFECT)
		Duel.Recover(1-tp,ct*600,REASON_EFFECT)
	end
end
